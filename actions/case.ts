"use server";

import { CasePricingPlanModel } from "@/generated/prisma/models";
import { ERRORS } from "@/lib/errors";
import { tenantPrisma } from "@/lib/prisma";
import { actionClientWithLab } from "@/lib/safe-action";
import { caseServerToFrontDTO, draftCaseServerToDTO, draftSummaryServerToDTO } from "@/lib/server-only-helpers";

import { JawType } from "@/schema/base/enums.base";
import { ToothPosition } from "@/schema/base/tooth-position.base";
import { CreateCaseInputSchema, SaveDraftCaseInputSchema } from "@/schema/composed/case.details";
import { APIError } from "better-auth";
import z from "zod/v3";

export const createDentalCaseAction = actionClientWithLab
	.metadata({
		actionName: "Create-New-Dental-Case-Action",
		requiredLabRole: "ADMIN",
	})
	.inputSchema(CreateCaseInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { patientId, clinicId, dentistId, caseCategoryId, status, deadline, caseAssetFiles, caseWorkItems, staffAssignments, notes } = parsedInput;
		const { labId } = ctx;

		// Check if the required fields exists.
		// Get the selected pricing plan, and copy the pricing as a backup to the case work item.
		// Then we have to caluclate totalPrice for the case work item itself
		// then calculate the grandTotal for the case based on the totalPrice of all case work items.
		// normalize undefined fields to be null.
		// create the case assets query
		// create the selected teeth query

		// for selected teeth I should normalize them to be positions
		// for assets they can be created throughly
		// for work items at least one should exists, AND have pricingPlanId AND if jawType is Upper or Lower there should be teeth selected
		const validWorkItems = (caseWorkItems ?? []).filter((item) => item.productId && item.casePricingPlanId);

		if (status !== "DRAFT" && validWorkItems.length === 0) {
			throw ERRORS.INVALID_INPUT;
		}

		try {
			const prisma = await tenantPrisma(labId);

			// ─────────────────────────────────────────────────────────────────
			// STEP 1: Ownership Verification
			// Verify all referenced entities exist AND belong to this lab.
			// tenantPrisma already scopes by labId — if findUnique returns null,
			// the record either doesn't exist or belongs to another lab.
			// Run all checks in parallel for performance.
			// ─────────────────────────────────────────────────────────────────

			const pricingPlanIds = [...new Set(validWorkItems.map((cw) => cw.casePricingPlanId))];
			const staffIds = staffAssignments?.map((s) => s.staffId) ?? [];

			const [patient, clinic, category, pricingPlans, staffMembers] = await Promise.all([
				prisma.patient.findUnique({
					where: { id: patientId },
					select: { id: true },
				}),

				clinicId
					? prisma.clinic.findUnique({
							where: { id: clinicId },
							select: { id: true, status: true },
						})
					: Promise.resolve(null),

				caseCategoryId
					? prisma.caseCategory.findUnique({
							where: { id: caseCategoryId },
							select: { id: true, isActive: true },
						})
					: Promise.resolve(null),

				pricingPlanIds.length > 0
					? prisma.casePricingPlan.findMany({
							where: { id: { in: pricingPlanIds } },
						})
					: Promise.resolve([]),

				staffIds.length > 0
					? prisma.labStaff.findMany({
							where: {
								id: { in: staffIds },
								isActive: true,
							},
							select: { id: true, roleCategory: true },
						})
					: Promise.resolve([]),
			]);

			// ─────────────────────────────────────────────────────────────────
			// STEP 2: Business Rule Validation
			// Zod handles shape/type. We handle cross-entity business rules here.
			// ─────────────────────────────────────────────────────────────────

			// Patient must exist in this lab
			if (!patient) {
				throw ERRORS.NOT_FOUND;
			}

			// Clinic must exist and not be suspended
			if (clinicId) {
				if (!clinic) throw ERRORS.NOT_FOUND;
				if (clinic.status === "SUSPENDED") {
					throw ERRORS.OPERATION_NOT_ALLOWED;
				}
			}

			// Dentist can only be set if clinic is set (enforced by schema superRefine too,
			// but defense in depth)
			if (dentistId && !clinicId) {
				throw ERRORS.INVALID_INPUT;
			}

			// Dentist must belong to the selected clinic
			if (dentistId && clinicId) {
				const dentist = await prisma.dentist.findFirst({
					where: { id: dentistId, clinicId },
					select: { id: true },
				});
				if (!dentist) throw ERRORS.NOT_FOUND;
			}

			// Category must exist and be active
			if (caseCategoryId) {
				if (!category) throw ERRORS.NOT_FOUND;
				if (!category.isActive) throw ERRORS.OPERATION_NOT_ALLOWED;
			}

			// Every pricing plan ID must resolve to a record in this lab
			const pricingPlanMap = new Map(pricingPlans.map((pp) => [pp.id, pp]));

			for (const cw of validWorkItems) {
				if (!pricingPlanMap.has(cw.casePricingPlanId)) {
					throw ERRORS.NOT_FOUND;
				}
			}

			// Every staff ID must resolve to an active member of this lab
			if (staffIds.length > 0) {
				const staffMap = new Map(staffMembers.map((s) => [s.id, s]));
				const missingStaff = staffAssignments?.find((s) => !staffMap.has(s.staffId));
				if (missingStaff) throw ERRORS.NOT_MEMBER;

				// No duplicate staff assignments (same person assigned twice)
				const uniqueStaffIds = new Set(staffIds);
				if (uniqueStaffIds.size !== staffIds.length) {
					throw ERRORS.INVALID_INPUT;
				}
			}

			// ─────────────────────────────────────────────────────────────────
			// STEP 3: Price Computation
			// Never trust client-computed prices. Always recompute from DB records.
			// ─────────────────────────────────────────────────────────────────

			const computedWorkItems = validWorkItems.map((cw) => {
				const plan = pricingPlanMap.get(cw.casePricingPlanId)!;
				const teeth = cw.selectedTeeth?.map((t) => t.toothPosition) ?? [];
				const totalPrice = computeCaseItemPrice(plan, teeth, cw.jawType);

				return {
					// Identity
					productId: cw.productId ?? null,
					workTypeId: cw.workTypeId ?? null,
					casePricingPlanId: plan.id,
					jawType: cw.jawType,

					// Server-computed price — client value discarded
					totalPrice,

					// Pricing snapshot — preserved for historical accuracy
					// even if the plan is modified later
					pricingStrategy: plan.pricingStrategy,
					bulkPrice: plan.bulkPrice !== null ? Number(plan.bulkPrice) : null,
					toothPrice: plan.toothPrice !== null ? Number(plan.toothPrice) : null,
					firstToothPrice: plan.firstToothPrice !== null ? Number(plan.firstToothPrice) : null,
					additionalToothPrice: plan.additionalToothPrice !== null ? Number(plan.additionalToothPrice) : null,
					teethCountToApplyBulkPrice: plan.teethCountToApplyBulkPrice !== null ? Number(plan.teethCountToApplyBulkPrice) : null,

					// Clinical metadata
					notes: cw.notes ?? null,
					shadeSystem: cw.shadeSystem ?? null,
					baseShade: cw.baseShade ?? null,
					stumpShade: cw.stumpShade ?? null,
					shadeNotes: cw.shadeNotes ?? null,

					// Teeth — normalized to positions only
					selectedTeeth: teeth,
				};
			});

			const grandTotal = computedWorkItems.reduce((sum, item) => sum + item.totalPrice, 0);

			// Case is ASSIGNED if a technician-role staff member is assigned
			const isCaseAssigned = staffAssignments?.some((s) => ["TECHNICIAN", "SENIOR_TECHNICIAN", "MANAGER"].includes(s.roleCategory)) ?? false;

			const resolvedStatus = status === "DRAFT" ? "DRAFT" : isCaseAssigned ? "ASSIGNED" : "NEW";

			// ─────────────────────────────────────────────────────────────────
			// STEP 4: Transaction
			// Only what must be atomic is inside the transaction.
			// Case number increment + case creation must be a single unit —
			// if the case creation fails, the counter must not increment.
			// ─────────────────────────────────────────────────────────────────

			const dentalCase = await prisma.$transaction(async (tx) => {
				// Atomic case number — prevents race conditions under concurrent requests
				const updatedLab = await tx.lab.update({
					where: { id: labId },
					data: { nextCaseNumber: { increment: 1 } },
					select: { nextCaseNumber: true },
				});

				const caseNumber = `LAB-${updatedLab.nextCaseNumber.toString().padStart(4, "0")}`;

				return tx.case.create({
					data: {
						// Core fields
						patientId,
						labId,
						caseNumber,
						status: resolvedStatus,
						grandTotal,
						notes: notes ?? null,
						deadline: deadline ?? null,

						// Optional relations
						clinicId: clinicId ?? null,
						dentistId: dentistId ?? null,
						caseCategoryId: caseCategoryId ?? null,

						// Work items with nested teeth
						caseItems:
							computedWorkItems.length > 0
								? {
										create: computedWorkItems.map((item) => ({
											productId: item.productId,
											workTypeId: item.workTypeId,
											casePricingPlanId: item.casePricingPlanId,
											jawType: item.jawType,
											totalPrice: item.totalPrice,

											// Pricing snapshot
											pricingStrategy: item.pricingStrategy,
											bulkPrice: item.bulkPrice,
											toothPrice: item.toothPrice,
											firstToothPrice: item.firstToothPrice,
											additionalToothPrice: item.additionalToothPrice,
											teethCountToApplyBulkPrice: item.teethCountToApplyBulkPrice,

											// Clinical metadata
											notes: item.notes,
											shadeSystem: item.shadeSystem,
											baseShade: item.baseShade,
											stumpShade: item.stumpShade,
											shadeNotes: item.shadeNotes,

											// Teeth — nested createMany inside create
											selectedTeeth:
												item.selectedTeeth.length > 0
													? {
															createMany: {
																data: item.selectedTeeth.map((pos) => ({
																	toothPosition: pos,
																	// labId injected by tenantPrisma
																	labId,
																})),
															},
														}
													: undefined,
											labId,
										})),
									}
								: undefined,

						// Staff assignments — snapshot commission at time of assignment
						staffAssignments:
							staffAssignments && staffAssignments.length > 0
								? {
										createMany: {
											data: staffAssignments.map((s) => ({
												staffId: s.staffId,
												roleCategory: s.roleCategory,
												commissionType: s.commissionType,
												commissionValue: s.commissionValue,
												commissionTotal: 0, // computed at case completion
												isPaid: false,
												// labId injected by tenantPrisma
												labId,
											})),
										},
									}
								: undefined,

						// Asset files
						caseAssetFiles:
							caseAssetFiles && caseAssetFiles.length > 0
								? {
										createMany: {
											data: caseAssetFiles.map((f) => ({
												title: f.title ?? null,
												description: f.description ?? null,
												documentUrl: f.documentUrl,
												assetFileType: f.assetFileType,
												fileExtension: f.fileExtension,
												labId,
											})),
										},
									}
								: undefined,
					},

					// Return enough data for the client to update its state
					include: {
						patient: {
							select: { id: true, name: true, age: true, gender: true },
						},
						clinic: {
							select: { id: true, name: true, city: true, type: true },
						},
						dentist: {
							select: { id: true, name: true },
						},
						caseCategory: {
							select: { id: true, name: true, imageUrl: true },
						},
						caseItems: {
							include: {
								selectedTeeth: { select: { id: true, toothPosition: true } },
								product: { select: { id: true, name: true } },
								workType: { select: { id: true, name: true } },
							},
						},
						staffAssignments: {
							include: {
								staff: {
									select: {
										id: true,
										firstName: true,
										lastName: true,
										roleCategory: true,
										jobTitle: true,
										avatarUrl: true,
									},
								},
							},
						},
						caseAssetFiles: true,
					},
				});
			});

			return { dentalCase: caseServerToFrontDTO(dentalCase) };
		} catch (e) {
			if (e instanceof APIError || e instanceof Error) {
				console.error("[Create-New-Dental-Case-Action] Error", e.message);
			}
			throw e;
		}
	});

export const saveDraftCaseAction = actionClientWithLab
	.metadata({
		actionName: "Save-Draft-Case-Action",
		requiredLabRole: null, // any lab member can save a draft
	})
	.inputSchema(SaveDraftCaseInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { patientId, clinicId, dentistId, caseCategoryId, deadline, notes, caseWorkItems, staffAssignments, caseAssetFiles, existingDraftId } = parsedInput;

		const { labId } = ctx;
		const prisma = await tenantPrisma(labId);

		// ─────────────────────────────────────────────────────────────────
		// STEP 1: Verify patient exists — the one hard requirement
		// ─────────────────────────────────────────────────────────────────

		try {
			const patient = await prisma.patient.findUnique({
				where: { id: patientId },
				select: { id: true },
			});

			if (!patient) throw ERRORS.NOT_FOUND;

			// ─────────────────────────────────────────────────────────────────
			// STEP 2: If updating existing draft, verify ownership
			// ─────────────────────────────────────────────────────────────────

			if (existingDraftId) {
				const existingDraft = await prisma.case.findUnique({
					where: { id: existingDraftId },
					select: { id: true, status: true },
				});

				if (!existingDraft) throw ERRORS.NOT_FOUND;

				// Can only update a draft — not a submitted case
				if (existingDraft.status !== "DRAFT") {
					throw ERRORS.OPERATION_NOT_ALLOWED;
				}
			}

			// ─────────────────────────────────────────────────────────────────
			// STEP 3: Light ownership checks — only for provided values
			// Unlike the full action, we don't throw if optional fields are
			// missing — we just skip them. But if provided, they must be valid.
			// ─────────────────────────────────────────────────────────────────

			const [clinic, category] = await Promise.all([
				clinicId
					? prisma.clinic.findUnique({
							where: { id: clinicId },
							select: { id: true, status: true },
						})
					: Promise.resolve(null),

				caseCategoryId
					? prisma.caseCategory.findUnique({
							where: { id: caseCategoryId },
							select: { id: true, isActive: true },
						})
					: Promise.resolve(null),
			]);

			if (clinicId && !clinic) throw ERRORS.NOT_FOUND;
			if (clinicId && clinic?.status === "SUSPENDED") throw ERRORS.OPERATION_NOT_ALLOWED;
			if (caseCategoryId && !category) throw ERRORS.NOT_FOUND;
			if (dentistId && !clinicId) throw ERRORS.INVALID_INPUT;

			// ─────────────────────────────────────────────────────────────────
			// STEP 4: Partial price computation
			// Only compute prices for work items that have a pricing plan.
			// Items without a plan get totalPrice: 0.
			// ─────────────────────────────────────────────────────────────────

			const pricingPlanIds = [...new Set(caseWorkItems.filter((cw) => cw.casePricingPlanId).map((cw) => cw.casePricingPlanId!))];

			const pricingPlans =
				pricingPlanIds.length > 0
					? await prisma.casePricingPlan.findMany({
							where: { id: { in: pricingPlanIds } },
						})
					: [];

			const pricingPlanMap = new Map(pricingPlans.map((pp) => [pp.id, pp]));

			const computedWorkItems = caseWorkItems.map((cw) => {
				const plan = cw.casePricingPlanId ? pricingPlanMap.get(cw.casePricingPlanId) : null;

				const teeth = cw.selectedTeeth?.map((t) => t.toothPosition) ?? [];

				// Only compute if we have a plan — otherwise store 0
				const totalPrice = plan ? computeCaseItemPrice(plan, teeth, cw.jawType) : 0;

				return {
					productId: cw.productId ?? null,
					workTypeId: cw.workTypeId ?? null,
					casePricingPlanId: cw.casePricingPlanId ?? null,
					jawType: cw.jawType,
					totalPrice,

					// Pricing snapshot — only if plan exists
					pricingStrategy: plan?.pricingStrategy ?? "BULK",
					bulkPrice: plan?.bulkPrice !== null ? Number(plan?.bulkPrice ?? 0) : null,
					toothPrice: plan?.toothPrice !== null ? Number(plan?.toothPrice ?? 0) : null,
					firstToothPrice: plan?.firstToothPrice !== null ? Number(plan?.firstToothPrice ?? 0) : null,
					additionalToothPrice: plan?.additionalToothPrice !== null ? Number(plan?.additionalToothPrice ?? 0) : null,
					teethCountToApplyBulkPrice: plan?.teethCountToApplyBulkPrice !== null ? Number(plan?.teethCountToApplyBulkPrice ?? 0) : null,

					notes: cw.notes ?? null,
					shadeSystem: cw.shadeSystem ?? null,
					baseShade: cw.baseShade ?? null,
					stumpShade: cw.stumpShade ?? null,
					shadeNotes: cw.shadeNotes ?? null,
					selectedTeeth: teeth,
				};
			});

			const grandTotal = computedWorkItems.reduce((sum, item) => sum + item.totalPrice, 0);

			// ─────────────────────────────────────────────────────────────────
			// STEP 5: Transaction — upsert pattern
			// If existingDraftId → update the existing draft
			// If not → create a new draft with a case number
			// ─────────────────────────────────────────────────────────────────

			const draftCase = await prisma.$transaction(async (tx) => {
				// ── UPDATE existing draft ──────────────────────────────────
				if (existingDraftId) {
					// Delete existing nested records — simpler than diffing
					// Work items, teeth, assets, assignments are cheap to recreate
					await tx.caseWorkItem.deleteMany({
						where: { dentalCaseId: existingDraftId },
					});
					await tx.caseAssetFile.deleteMany({
						where: { dentalCaseId: existingDraftId },
					});
					await tx.caseStaffAssignment.deleteMany({
						where: { caseId: existingDraftId },
					});

					return tx.case.update({
						where: { id: existingDraftId, labId },
						data: {
							patientId,
							clinicId: clinicId ?? null,
							dentistId: dentistId ?? null,
							caseCategoryId: caseCategoryId ?? null,
							grandTotal,
							deadline: deadline ?? null,
							notes: notes ?? null,
							status: "DRAFT",
							labId,
							caseItems:
								computedWorkItems.length > 0
									? {
											create: computedWorkItems.map((item) => ({
												productId: item.productId,
												workTypeId: item.workTypeId,
												casePricingPlanId: item.casePricingPlanId!,
												jawType: item.jawType,
												totalPrice: item.totalPrice,
												pricingStrategy: item.pricingStrategy,
												bulkPrice: item.bulkPrice,
												toothPrice: item.toothPrice,
												firstToothPrice: item.firstToothPrice,
												additionalToothPrice: item.additionalToothPrice,
												teethCountToApplyBulkPrice: item.teethCountToApplyBulkPrice,
												notes: item.notes,
												shadeSystem: item.shadeSystem,
												baseShade: item.baseShade,
												stumpShade: item.stumpShade,
												shadeNotes: item.shadeNotes,

												selectedTeeth:
													item.selectedTeeth.length > 0
														? {
																createMany: {
																	data: item.selectedTeeth.map((pos) => ({
																		toothPosition: pos,
																		labId,
																	})),
																},
															}
														: undefined,
												labId,
											})),
										}
									: undefined,

							staffAssignments:
								staffAssignments && staffAssignments.length > 0
									? {
											createMany: {
												data: staffAssignments.map((s) => ({
													staffId: s.staffId,
													roleCategory: s.roleCategory,
													commissionType: s.commissionType,
													commissionValue: s.commissionValue,
													commissionTotal: 0,
													isPaid: false,
													labId,
												})),
											},
										}
									: undefined,

							caseAssetFiles:
								caseAssetFiles && caseAssetFiles.length > 0
									? {
											createMany: {
												data: caseAssetFiles.map((f) => ({
													title: f.title ?? null,
													description: f.description ?? null,
													documentUrl: f.documentUrl,
													assetFileType: f.assetFileType,
													fileExtension: f.fileExtension,
													labId,
												})),
											},
										}
									: undefined,
						},
						include: {
							patient: { select: { id: true, name: true } },
							clinic: { select: { id: true, name: true, city: true } },
							caseItems: { include: { selectedTeeth: true } },
							staffAssignments: true,
							caseAssetFiles: true,
						},
					});
				}

				// ── CREATE new draft ───────────────────────────────────────
				const updatedLab = await tx.lab.update({
					where: { id: labId },
					data: { nextCaseNumber: { increment: 1 } },
					select: { nextCaseNumber: true },
				});

				const caseNumber = `LAB-${updatedLab.nextCaseNumber.toString().padStart(4, "0")}`;

				console.log("Recieved Pricing Plans", computedWorkItems);
				return tx.case.create({
					data: {
						patientId,
						labId,
						caseNumber,
						status: "DRAFT",
						grandTotal,
						deadline: deadline ?? null,
						notes: notes ?? null,
						clinicId: clinicId ?? null,
						dentistId: dentistId ?? null,
						caseCategoryId: caseCategoryId ?? null,

						caseItems:
							computedWorkItems.length > 0
								? {
										create: computedWorkItems.map((item) => ({
											productId: item.productId,
											workTypeId: item.workTypeId,
											casePricingPlanId: item.casePricingPlanId!,
											jawType: item.jawType,
											totalPrice: item.totalPrice,
											pricingStrategy: item.pricingStrategy,
											bulkPrice: item.bulkPrice,
											toothPrice: item.toothPrice,
											firstToothPrice: item.firstToothPrice,
											additionalToothPrice: item.additionalToothPrice,
											teethCountToApplyBulkPrice: item.teethCountToApplyBulkPrice,
											notes: item.notes,
											shadeSystem: item.shadeSystem,
											baseShade: item.baseShade,
											stumpShade: item.stumpShade,
											shadeNotes: item.shadeNotes,
											labId,
											selectedTeeth:
												item.selectedTeeth.length > 0
													? {
															createMany: {
																data: item.selectedTeeth.map((pos) => ({
																	toothPosition: pos,
																	labId,
																})),
															},
														}
													: undefined,
										})),
									}
								: undefined,

						staffAssignments:
							staffAssignments && staffAssignments.length > 0
								? {
										createMany: {
											data: staffAssignments.map((s) => ({
												staffId: s.staffId,
												roleCategory: s.roleCategory,
												commissionType: s.commissionType,
												commissionValue: s.commissionValue,
												commissionTotal: 0,
												isPaid: false,
												labId,
											})),
										},
									}
								: undefined,

						caseAssetFiles:
							caseAssetFiles && caseAssetFiles.length > 0
								? {
										createMany: {
											data: caseAssetFiles.map((f) => ({
												title: f.title ?? null,
												description: f.description ?? null,
												documentUrl: f.documentUrl,
												assetFileType: f.assetFileType,
												fileExtension: f.fileExtension,
												labId,
											})),
										},
									}
								: undefined,
					},
					include: {
						patient: { select: { id: true, name: true } },
						clinic: { select: { id: true, name: true, city: true } },
						caseItems: { include: { selectedTeeth: true } },
						staffAssignments: true,
						caseAssetFiles: true,
					},
				});
			});

			return {
				draftCase: draftCaseServerToDTO(draftCase),
			};
		} catch (e) {
			if (e instanceof APIError || e instanceof Error) {
				console.error("[Save-Draft-Dental-Case-Action] Error", e.message);
			}
			throw e;
		}
	});

// ========================== Retrieval =================================
export const getRecentDraftsAction = actionClientWithLab
	.metadata({
		actionName: "Get-Recent-Drafts-Action",
		requiredLabRole: null,
	})
	.inputSchema(z.object({ limit: z.number().min(1).max(20).default(5) }))
	.action(async ({ parsedInput, ctx }) => {
		const { labId } = ctx;
		const prisma = await tenantPrisma(labId);

		const drafts = await prisma.case.findMany({
			where: { status: "DRAFT" },
			orderBy: { updatedAt: "desc" },
			take: parsedInput.limit,
			select: {
				id: true,
				caseNumber: true,
				updatedAt: true,
				patient: { select: { id: true, name: true } },
				clinic: { select: { id: true, name: true } },
			},
		});

		return {
			drafts: drafts.map(draftSummaryServerToDTO),
		};
	});

export const getDraftByPatientAction = actionClientWithLab
	.metadata({
		actionName: "Get-Draft-By-Patient-Action",
		requiredLabRole: null,
	})
	.inputSchema(z.object({ patientId: z.string().min(1) }))
	.action(async ({ parsedInput, ctx }) => {
		const { labId } = ctx;
		const prisma = await tenantPrisma(labId);

		const draft = await prisma.case.findFirst({
			where: {
				patientId: parsedInput.patientId,
				status: "DRAFT",
			},
			orderBy: { updatedAt: "desc" }, // most recent if multiple
			select: {
				id: true,
				caseNumber: true,
				updatedAt: true,
				caseCategoryId: true,
				clinicId: true,
				deadline: true,
				notes: true,
				patient: { select: { id: true, name: true } },
				clinic: { select: { id: true, name: true } },
				caseCategory: { select: { id: true, name: true } },
				caseItems: {
					include: {
						selectedTeeth: { select: { toothPosition: true } },
					},
				},
				staffAssignments: {
					select: {
						staffId: true,
						roleCategory: true,
						commissionType: true,
						commissionValue: true,
					},
				},
				caseAssetFiles: {
					select: {
						title: true,
						description: true,
						documentUrl: true,
						assetFileType: true,
						fileExtension: true,
					},
				},
			},
		});

		return { draft: draft ?? null };
	});

export const loadDraftByIdAction = actionClientWithLab
	.metadata({
		actionName: "Load-Draft-By-Id-Action",
		requiredLabRole: null,
	})
	.inputSchema(z.object({ draftId: z.string().min(1) }))
	.action(async ({ parsedInput, ctx }) => {
		const { labId } = ctx;
		const prisma = await tenantPrisma(labId);

		const draft = await prisma.case.findUnique({
			where: { id: parsedInput.draftId },
			include: {
				patient: { select: { id: true, name: true } },
				clinic: { select: { id: true, name: true, city: true, type: true } },
				caseCategory: { select: { id: true, name: true } },
				caseItems: {
					include: {
						selectedTeeth: { select: { toothPosition: true } },
						product: { select: { id: true, name: true } },
						workType: { select: { id: true, name: true } },
					},
				},
				staffAssignments: {
					select: {
						staffId: true,
						roleCategory: true,
						commissionType: true,
						commissionValue: true,
					},
				},
				caseAssetFiles: true,
			},
		});

		if (!draft) throw ERRORS.NOT_FOUND;
		if (draft.status !== "DRAFT") throw ERRORS.OPERATION_NOT_ALLOWED;

		return { draft: draftCaseServerToDTO(draft) };
	});

const computeCaseItemPrice = (pricingPlan: CasePricingPlanModel, selectedTeeth: ToothPosition[], jawType: JawType) => {
	if (!pricingPlan) return 0;
	const count = selectedTeeth.length;

	// If JawType is OTHER (No charting), assume count is 1 for pricing purposes if needed,
	// though flat rates usually apply here.
	const effectiveCount = jawType === "OTHER" && count === 0 ? 1 : count;

	// Don't charge if no teeth selected (unless it's a flat bulk rate)
	if (effectiveCount === 0 && pricingPlan.pricingStrategy !== "BULK") return 0;

	switch (pricingPlan.pricingStrategy) {
		case "BULK":
			return Number(pricingPlan.bulkPrice || 0);

		case "PERTOOTH":
			// Standard multiplication
			return effectiveCount * Number(pricingPlan.toothPrice || 0);

		case "CUSTOM":
			// 1. Check if they hit the Bulk Cap interval first!
			if (pricingPlan.teethCountToApplyBulkPrice && pricingPlan.bulkPrice && effectiveCount >= Number(pricingPlan.teethCountToApplyBulkPrice)) {
				return Number(pricingPlan.bulkPrice);
			}

			// 2. Otherwise, apply Tiered Pricing (1st tooth = X, rest = Y), if total teeth count >= bulkThreshold, apply bulkPrice
			const firstPrice = Number(pricingPlan.firstToothPrice || 0);
			const additionalPrice = Number(pricingPlan.additionalToothPrice || 0);

			if (effectiveCount === 1) return firstPrice;
			return firstPrice + additionalPrice * (effectiveCount - 1);

		default:
			return 0;
	}
};
