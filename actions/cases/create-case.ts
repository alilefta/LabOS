"use server";

import { CaseActivityLogCreateManyDentalCaseInput } from "@/generated/prisma/models";
import { ERRORS } from "@/lib/errors";
import { tenantPrisma } from "@/lib/prisma";
import { actionClientWithLab } from "@/lib/safe-action";
import { computeCaseItemPrice, draftCaseServerToDTO, draftSummaryServerToDTO, optionalSelectiveDraftCaseServerToDTO } from "@/lib/server-only-helpers";

import { CreateCaseInputSchema, SaveDraftCaseInputSchema } from "@/schema/composed/case.details";
import { APIError } from "better-auth";
import z from "zod/v3";

export const createDentalCaseAction = actionClientWithLab
	.metadata({
		actionName: "Create-New-Dental-Case-Action",
		requiredLabRole: null,
	})
	.inputSchema(CreateCaseInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { patientId, clinicId, dentistId, caseCategoryId, status, deadline, caseAssetFiles, caseWorkItems, staffAssignments, notes, existingDraftId } = parsedInput;
		const { labId, user } = ctx;

		// !!!!!!!!!!!! creating a case from stored draft should be done through update not create!!!!!

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

			const [patient, clinic, category, pricingPlans, staffMembers, dentist] = await Promise.all([
				prisma.patient.findUnique({
					where: { id: patientId, labId },
					select: { id: true },
				}),

				clinicId
					? prisma.clinic.findUnique({
							where: { id: clinicId, labId },
							select: { id: true, status: true },
						})
					: Promise.resolve(null),

				caseCategoryId
					? prisma.caseCategory.findUnique({
							where: { id: caseCategoryId, labId },
							select: { id: true, isActive: true },
						})
					: Promise.resolve(null),

				pricingPlanIds.length > 0
					? prisma.casePricingPlan.findMany({
							where: { id: { in: pricingPlanIds }, labId },
						})
					: Promise.resolve([]),

				staffIds.length > 0
					? prisma.labStaff.findMany({
							where: { id: { in: staffIds }, isActive: true, labId },
							select: { id: true, roleCategory: true, firstName: true, lastName: true },
						})
					: Promise.resolve([]),
				dentistId && clinicId ? prisma.dentist.findFirst({ where: { id: dentistId, clinicId, labId }, select: { id: true } }) : Promise.resolve(null),
			]);

			// Resolve whether we're updating an existing draft or creating fresh
			let resolvedDraftId: string | undefined = parsedInput.existingDraftId;

			if (resolvedDraftId) {
				const existingDraft = await prisma.case.findUnique({
					where: { id: resolvedDraftId, labId },
					select: { id: true, status: true, patientId: true },
				});

				if (!existingDraft) throw ERRORS.NOT_FOUND;
				if (existingDraft.status !== "DRAFT") {
					resolvedDraftId = undefined; // replaced the throw with this line, NEED TEST
					// throw ERRORS.OPERATION_NOT_ALLOWED;
				}

				if (existingDraft.patientId !== patientId) {
					// Patient changed — create a new case, leave the original draft alone
					resolvedDraftId = undefined;
				}
			}

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
			if (dentistId && !dentist) throw ERRORS.NOT_FOUND;

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
			// PRE-TRANSACTION: Build the Genesis Activity Logs
			// ─────────────────────────────────────────────────────────────────
			const staffMap = new Map(staffMembers.map((s) => [s.id, s]));

			// We use an array of objects to map to Prisma's `createMany`
			const genesisLogs: CaseActivityLogCreateManyDentalCaseInput[] = [
				{
					labId,
					actorId: user.id, // The user performing the action
					actorName: user.name || "System", // The user's name
					type: "CASE_CREATED",
					summary: "Created case prescription",
					payload: {},
				},
			];
			if (notes) {
				genesisLogs.push({
					labId,
					actorId: user.id,
					actorName: user.name || "System",
					type: "NOTE_ADDED",
					summary: "Added global clinical instructions",
					payload: { note: notes },
				});
			}

			if (staffAssignments && staffAssignments.length > 0) {
				staffAssignments.forEach((sa) => {
					const staffData = staffMap.get(sa.staffId);
					if (staffData) {
						genesisLogs.push({
							labId,
							actorId: user.id,
							actorName: user.name || "System",
							type: "STAFF_ASSIGNED",
							summary: `Assigned ${staffData.firstName} ${staffData.lastName}`,
							payload: {
								staffId: sa.staffId,
								staffName: `${staffData.firstName} ${staffData.lastName}`,
								roleCategory: sa.roleCategory,
							},
						});
					}
				});
			}

			if (caseAssetFiles && caseAssetFiles.length > 0) {
				caseAssetFiles.forEach((file) => {
					genesisLogs.push({
						labId,
						actorId: user.id,
						actorName: user.name || "System",
						type: "FILE_UPLOADED",
						summary: `Attached ${file.assetFileType}: ${file.title || "Asset"}`,
						payload: {
							fileId: file.documentUrl, // Fallback if no specific file ID exists yet
							fileName: file.title || "Clinical Asset",
							assetFileType: file.assetFileType,
						},
					});
				});
			}

			// ─────────────────────────────────────────────────────────────────
			// STEP 4: Transaction
			// Only what must be atomic is inside the transaction.
			// Case number increment + case creation must be a single unit —
			// if the case creation fails, the counter must not increment.
			// ─────────────────────────────────────────────────────────────────

			const createdCase = await prisma.$transaction(
				async (tx) => {
					// ── UPDATE existing draft → promote to real case ──────────────
					if (resolvedDraftId) {
						// Delete stale nested records — will be replaced with fresh computed data
						// await tx.caseWorkItem.deleteMany({
						// 	where: { dentalCaseId: resolvedDraftId, labId },
						// });
						// await tx.caseAssetFile.deleteMany({
						// 	where: { dentalCaseId: resolvedDraftId, labId },
						// });
						// await tx.caseStaffAssignment.deleteMany({
						// 	where: { caseId: resolvedDraftId, labId },
						// });

						// To improve RTT I replaced the queries above with this sequential pattern
						await Promise.all([
							tx.caseWorkItem.deleteMany({ where: { dentalCaseId: resolvedDraftId, labId } }),
							tx.caseAssetFile.deleteMany({ where: { dentalCaseId: resolvedDraftId, labId } }),
							tx.caseStaffAssignment.deleteMany({ where: { caseId: resolvedDraftId, labId } }),
						]);

						return tx.case.update({
							where: { id: resolvedDraftId, labId },
							data: {
								// Promote — status changes from DRAFT to NEW or ASSIGNED
								status: resolvedStatus,
								grandTotal,
								notes: notes ?? null,
								deadline: deadline ?? null,
								clinicId: clinicId ?? null,
								dentistId: dentistId ?? null,
								caseCategoryId: caseCategoryId ?? null,
								patientId,

								// Recreate work items with fresh computed prices
								caseItems:
									computedWorkItems.length > 0
										? {
												create: computedWorkItems.map((item) => ({
													productId: item.productId,
													workTypeId: item.workTypeId,
													casePricingPlanId: item.casePricingPlanId,
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
								caseActivityLogs: {
									createMany: { data: genesisLogs },
								},
							},

							select: { id: true, caseNumber: true },
						});
					}

					// ── CREATE new case ────────────────────────────────────────────
					const updatedLab = await tx.lab.update({
						where: { id: labId },
						data: { nextCaseNumber: { increment: 1 } },
						select: { nextCaseNumber: true },
					});

					const caseNumber = `LAB-${updatedLab.nextCaseNumber.toString().padStart(4, "0")}`;

					return tx.case.create({
						data: {
							patientId,
							labId,
							caseNumber,
							status: resolvedStatus,
							grandTotal,
							notes: notes ?? null,
							deadline: deadline ?? null,
							clinicId: clinicId ?? null,
							dentistId: dentistId ?? null,
							caseCategoryId: caseCategoryId ?? null,
							caseItems:
								computedWorkItems.length > 0
									? {
											create: computedWorkItems.map((item) => ({
												productId: item.productId,
												workTypeId: item.workTypeId,
												casePricingPlanId: item.casePricingPlanId,
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
							caseActivityLogs: {
								createMany: { data: genesisLogs },
							},
						},
						select: { id: true, caseNumber: true },
					});
				},
				{ maxWait: 5000, timeout: 15000 },
			);

			// ─────────────────────────────────────────────────────────────────
			// STEP 5: Fetch the Fully Populated DTO (READ ONLY)
			// Happens outside the transaction, completely safe and fast!
			// ─────────────────────────────────────────────────────────────────

			return { createdCase: createdCase };

			// return { caseId: dentalCase.id };
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
				where: { id: patientId, labId },
				select: { id: true },
			});

			if (!patient) throw ERRORS.NOT_FOUND;

			// ─────────────────────────────────────────────────────────────────
			// STEP 2: If updating existing draft, verify ownership
			// ─────────────────────────────────────────────────────────────────

			if (existingDraftId) {
				const existingDraft = await prisma.case.findUnique({
					where: { id: existingDraftId, labId },
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
							where: { id: clinicId, labId },
							select: { id: true, status: true },
						})
					: Promise.resolve(null),

				caseCategoryId
					? prisma.caseCategory.findUnique({
							where: { id: caseCategoryId, labId },
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
							where: { id: { in: pricingPlanIds }, labId },
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
					// await tx.caseWorkItem.deleteMany({
					// 	where: { dentalCaseId: existingDraftId, labId },
					// });
					// await tx.caseAssetFile.deleteMany({
					// 	where: { dentalCaseId: existingDraftId, labId },
					// });
					// await tx.caseStaffAssignment.deleteMany({
					// 	where: { caseId: existingDraftId, labId },
					// });
					await Promise.all([
						tx.caseWorkItem.deleteMany({ where: { dentalCaseId: existingDraftId, labId } }),
						tx.caseAssetFile.deleteMany({ where: { dentalCaseId: existingDraftId, labId } }),
						tx.caseStaffAssignment.deleteMany({ where: { caseId: existingDraftId, labId } }),
					]);

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
			where: { status: "DRAFT", labId },
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

// export const getDentalCaseByIdAction = actionClientWithLab
// 	.metadata({
// 		actionName: "Get-Dental-Case-By-Id-Action",
// 		requiredLabRole: null,
// 	})
// 	.inputSchema(z.object({ caseId: z.string().min(1) }))
// 	.action(async ({ parsedInput, ctx }) => {
// 		const { labId } = ctx;
// 		const prisma = await tenantPrisma(labId);

// 		try {
// 			const dentalCase = await prisma.case.findUniqueOrThrow({
// 				where: { id: parsedInput.caseId, labId },
// 				include: {
// 					patient: {
// 						select: { id: true, name: true, age: true, gender: true },
// 					},
// 					clinic: {
// 						select: { id: true, name: true, city: true, type: true },
// 					},
// 					dentist: {
// 						select: { id: true, name: true },
// 					},
// 					caseCategory: {
// 						select: { id: true, name: true, imageUrl: true },
// 					},
// 					caseItems: {
// 						include: {
// 							selectedTeeth: { select: { id: true, toothPosition: true } },
// 							product: { select: { id: true, name: true } },
// 							workType: { select: { id: true, name: true } },
// 						},
// 					},
// 					staffAssignments: {
// 						include: {
// 							staff: {
// 								select: {
// 									id: true,
// 									firstName: true,
// 									lastName: true,
// 									roleCategory: true,
// 									jobTitle: true,
// 									avatarUrl: true,
// 								},
// 							},
// 						},
// 					},
// 					caseAssetFiles: true,
// 				},
// 			});

// 			return {
// 				dentalCase: serverCaseToCaseDetailsDTOMapper({ ...dentalCase, lab: null, staffAssignments: de}),
// 			};
// 		} catch (e) {
// 			if (e instanceof APIError || e instanceof Error) {
// 				console.error("[Get-Dental-Case-By-ID-Action] Error", e.message);
// 			}
// 			throw e;
// 		}
// 	});

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
				labId,
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
			where: { id: parsedInput.draftId, labId },
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

		return { draft: optionalSelectiveDraftCaseServerToDTO(draft) };
	});
