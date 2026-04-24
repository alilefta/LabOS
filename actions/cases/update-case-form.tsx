"use server";

// actions/cases/update-case-form.ts
// ─────────────────────────────────────────────────────────────────────────────
// updateDentalCaseAction — full case edit form submission.
//
// Strategy:
//   - Freely editable fields: clinic, dentist, category, deadline, notes
//   - Work items: replace-all (delete existing → recompute → create fresh)
//   - Staff assignments: replace-all (delete existing → create fresh)
//   - Asset files: additive only — new files attached via separate action,
//     deletions via deleteCaseAssetFileAction. NOT handled here.
//   - patientId, caseNumber, status: immutable, not accepted from client
//   - grandTotal: always server-computed from work items
//
// Security:
//   - labId from ctx only, never client input
//   - caseId ownership verified against ctx.labId
//   - All related entity IDs (clinic, dentist, category, pricing plans, staff)
//     verified to belong to ctx.labId before use
//   - Status gate: COMPLETED and DELIVERED cases cannot be edited
//
// Activity log:
//   - Writes a single CASE_UPDATED log entry per save with a structured diff
//     of what changed (old vs new for scalar fields, item counts for work items)
// ─────────────────────────────────────────────────────────────────────────────

import z from "zod/v4";
import { actionClientWithLab } from "@/lib/safe-action";
import { ActionError, ERRORS } from "@/lib/errors";
import { tenantPrisma } from "@/lib/prisma";
import { JawTypeSchema, StaffRoleCategorySchema, CommissionTypeSchema } from "@/schema/base/enums.base";
import { CaseStatus, CommissionType, StaffRoleCategory } from "@/generated/prisma/client";
import { ToothPositionSchema } from "@/schema/base/tooth-position.base";
import { computeCaseItemPrice } from "@/lib/server-only-helpers";
import { CaseActivityLogCreateManyInput } from "@/generated/prisma/models";
import { resolveActorName } from "@/data/activity-logs/build-activity-log";

// ─────────────────────────────────────────────────────────────────────────────
// Input schema
// ─────────────────────────────────────────────────────────────────────────────
// Mirrors CreateCaseInputSchema but:
//   - caseId is required (identifies which case to update)
//   - patientId, status, caseNumber are absent (server-controlled)
//   - grandTotal is absent (server-computed)
//   - superRefine enforces the same business rules as create

const emptyToNull = (v: string | undefined) => (v === undefined || v.trim() === "" ? null : v.trim());

const UpdateCaseWorkItemSchema = z.object({
	productId: z.string().trim().optional(),
	workTypeId: z.string().trim().optional(),
	casePricingPlanId: z.string().min(1, "Pricing plan is required"),
	jawType: JawTypeSchema.default("UPPER"),
	totalPrice: z.number().min(0).default(0), // client value — discarded, recomputed server-side
	selectedTeeth: z.array(z.object({ toothPosition: ToothPositionSchema })).default([]),
	notes: z.string().trim().optional(),
	shadeSystem: z.string().trim().optional(),
	baseShade: z.string().trim().optional(),
	stumpShade: z.string().trim().optional(),
	shadeNotes: z.string().trim().optional(),
});

const UpdateCaseStaffAssignmentSchema = z.object({
	staffId: z.string().min(1),
	roleCategory: StaffRoleCategorySchema,
	commissionType: CommissionTypeSchema,
	commissionValue: z.number().min(0),
});

export const UpdateCaseInputSchema = z
	.object({
		caseId: z.string().min(1),
		clinicId: z.string().trim().optional(),
		dentistId: z.string().trim().optional(),
		caseCategoryId: z.string().trim().optional(),
		deadline: z.date().optional(),
		notes: z.string().trim().optional(),
		caseWorkItems: z.array(UpdateCaseWorkItemSchema).default([]),
		staffAssignments: z.array(UpdateCaseStaffAssignmentSchema).default([]),
	})
	.superRefine((data, ctx) => {
		// Dentist requires clinic
		if (data.dentistId && !data.clinicId) {
			ctx.addIssue({
				code: "custom",
				message: "A clinic must be selected when a dentist is specified.",
				path: ["clinicId"],
			});
		}

		// Deadline required for non-draft cases (update form never edits drafts)
		if (!data.deadline) {
			ctx.addIssue({
				code: "custom",
				message: "A deadline is required.",
				path: ["deadline"],
			});
		}

		// Clinic required
		if (!data.clinicId?.trim()) {
			ctx.addIssue({
				code: "custom",
				message: "A clinic must be selected.",
				path: ["clinicId"],
			});
		}

		// Category required
		if (!data.caseCategoryId?.trim()) {
			ctx.addIssue({
				code: "custom",
				message: "A case category must be selected.",
				path: ["caseCategoryId"],
			});
		}

		// At least one valid work item
		const validWorkItems = data.caseWorkItems.filter((i) => i.casePricingPlanId);
		if (validWorkItems.length === 0) {
			ctx.addIssue({
				code: "custom",
				message: "At least one work item is required.",
				path: ["caseWorkItems"],
			});
		}

		// No duplicate staff
		const staffIds = data.staffAssignments.map((s) => s.staffId);
		if (new Set(staffIds).size !== staffIds.length) {
			ctx.addIssue({
				code: "custom",
				message: "Duplicate staff assignments are not allowed.",
				path: ["staffAssignments"],
			});
		}
	});

export type UpdateCaseInput = z.infer<typeof UpdateCaseInputSchema>;

// ─────────────────────────────────────────────────────────────────────────────
// Statuses that block editing
// ─────────────────────────────────────────────────────────────────────────────

const NON_EDITABLE_STATUSES: CaseStatus[] = ["COMPLETED", "DELIVERED"];

// ─────────────────────────────────────────────────────────────────────────────
// Diff helper — builds a structured change log for the activity entry
// ─────────────────────────────────────────────────────────────────────────────

type ScalarDiff = {
	field: string;
	from: unknown;
	to: unknown;
};

function buildScalarDiff(
	existing: {
		clinicId: string | null;
		dentistId: string | null;
		caseCategoryId: string | null;
		deadline: Date | null;
		notes: string | null;
	},
	incoming: {
		clinicId: string | null;
		dentistId: string | null;
		caseCategoryId: string | null;
		deadline: Date | undefined;
		notes: string | undefined;
	},
): ScalarDiff[] {
	const diffs: ScalarDiff[] = [];

	const toStr = (v: Date | string | null | undefined) => (v instanceof Date ? v.toISOString() : (v ?? null));

	if (existing.clinicId !== (incoming.clinicId ?? null)) {
		diffs.push({ field: "clinicId", from: existing.clinicId, to: incoming.clinicId ?? null });
	}
	if (existing.dentistId !== (incoming.dentistId ?? null)) {
		diffs.push({ field: "dentistId", from: existing.dentistId, to: incoming.dentistId ?? null });
	}
	if (existing.caseCategoryId !== (incoming.caseCategoryId ?? null)) {
		diffs.push({ field: "caseCategoryId", from: existing.caseCategoryId, to: incoming.caseCategoryId ?? null });
	}
	if (toStr(existing.deadline) !== toStr(incoming.deadline)) {
		diffs.push({ field: "deadline", from: toStr(existing.deadline), to: toStr(incoming.deadline) });
	}
	if ((existing.notes ?? null) !== (incoming.notes?.trim() || null)) {
		diffs.push({ field: "notes", from: existing.notes, to: incoming.notes?.trim() || null });
	}

	return diffs;
}

// ─────────────────────────────────────────────────────────────────────────────
// Action
// ─────────────────────────────────────────────────────────────────────────────

export const updateDentalCaseAction = actionClientWithLab
	.metadata({ actionName: "updateDentalCase", requiredLabRole: "ADMIN" })
	.inputSchema(UpdateCaseInputSchema)
	.action(async ({ ctx, parsedInput }) => {
		const { labId, labUser } = ctx;
		const { caseId, clinicId, dentistId, caseCategoryId, deadline, notes, caseWorkItems, staffAssignments } = parsedInput;

		const prisma = await tenantPrisma(labId);

		// ── STEP 1: Fetch existing case ──────────────────────────────────────────
		const existingCase = await prisma.case.findUnique({
			where: { id: caseId, labId },
			select: {
				id: true,
				labId: true,
				patientId: true,
				caseNumber: true,
				status: true,
				clinicId: true,
				dentistId: true,
				caseCategoryId: true,
				deadline: true,
				notes: true,
				grandTotal: true,
			},
		});

		if (!existingCase) throw ERRORS.CASE_NOT_FOUND;
		// Belt-and-suspenders ownership check
		if (existingCase.labId !== labId) throw ERRORS.FORBIDDEN;

		// ── Status gate ──────────────────────────────────────────────────────────
		if (NON_EDITABLE_STATUSES.includes(existingCase.status as CaseStatus)) {
			throw new ActionError(`Case cannot be edited in ${existingCase.status} status`, "OPERATION_NOT_ALLOWED", 400);
		}

		// ── STEP 2: Parallel entity verification ────────────────────────────────
		// All lookups use tenantPrisma which auto-injects labId —
		// so any ID that doesn't belong to this lab returns null.

		const validWorkItems = caseWorkItems.filter((i) => i.casePricingPlanId);
		const pricingPlanIds = [...new Set(validWorkItems.map((i) => i.casePricingPlanId))];
		const staffIds = staffAssignments.map((s) => s.staffId);

		const [clinic, dentist, category, pricingPlans, staffMembers, actorName] = await Promise.all([
			clinicId
				? prisma.clinic.findUnique({
						where: { id: clinicId, labId },
						select: { id: true, status: true },
					})
				: Promise.resolve(null),

			dentistId
				? prisma.dentist.findUnique({
						where: { id: dentistId, labId },
						select: { id: true, clinicId: true },
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
						// select: {
						// 	id: true,
						// 	pricingStrategy: true,
						// 	bulkPrice: true,
						// 	toothPrice: true,
						// 	firstToothPrice: true,
						// 	additionalToothPrice: true,
						// 	teethCountToApplyBulkPrice: true,
						// },
					})
				: Promise.resolve([]),

			staffIds.length > 0
				? prisma.labStaff.findMany({
						where: { id: { in: staffIds }, labId },
						select: { id: true, isActive: true },
					})
				: Promise.resolve([]),

			// Actor name for activity log
			resolveActorName(labUser.id, labId),
		]);

		// ── STEP 3: Business rule validation ────────────────────────────────────

		if (clinicId) {
			if (!clinic) throw ERRORS.NOT_FOUND;
			if (clinic.status === "SUSPENDED") throw ERRORS.OPERATION_NOT_ALLOWED;
		}

		if (dentistId) {
			if (!dentist) throw ERRORS.NOT_FOUND;
			// Dentist must belong to the selected clinic
			if (dentist.clinicId !== clinicId) {
				throw new ActionError("The selected dentist does not belong to the selected clinic", "INVALID_INPUT", 400);
			}
		}

		if (caseCategoryId) {
			if (!category) throw ERRORS.NOT_FOUND;
			if (!category.isActive) throw ERRORS.OPERATION_NOT_ALLOWED;
		}

		// All pricing plan IDs must resolve within this lab
		const pricingPlanMap = new Map(pricingPlans.map((pp) => [pp.id, pp]));
		for (const item of validWorkItems) {
			if (!pricingPlanMap.has(item.casePricingPlanId)) {
				throw ERRORS.NOT_FOUND;
			}
		}

		// All staff must be active members of this lab
		if (staffIds.length > 0) {
			const staffMap = new Map(staffMembers.map((s) => [s.id, s]));
			for (const assignment of staffAssignments) {
				const member = staffMap.get(assignment.staffId);
				if (!member) throw ERRORS.NOT_MEMBER;
				if (!member.isActive) {
					throw new ActionError("Cannot assign an inactive staff member", "OPERATION_NOT_ALLOWED", 400);
				}
			}
		}

		// ── STEP 4: Server-side price recomputation ──────────────────────────────
		// Client-sent totalPrice is discarded. Always recompute from DB plan.

		const computedWorkItems = validWorkItems.map((item) => {
			const plan = pricingPlanMap.get(item.casePricingPlanId)!;
			const teeth = item.selectedTeeth?.map((t) => t.toothPosition) ?? [];
			const totalPrice = computeCaseItemPrice(plan, teeth, item.jawType);

			return {
				productId: item.productId ?? null,
				workTypeId: item.workTypeId ?? null,
				casePricingPlanId: plan.id,
				jawType: item.jawType,

				// Server-computed
				totalPrice,

				// Pricing snapshot — frozen at time of save
				pricingStrategy: plan.pricingStrategy,
				bulkPrice: plan.bulkPrice !== null ? Number(plan.bulkPrice) : null,
				toothPrice: plan.toothPrice !== null ? Number(plan.toothPrice) : null,
				firstToothPrice: plan.firstToothPrice !== null ? Number(plan.firstToothPrice) : null,
				additionalToothPrice: plan.additionalToothPrice !== null ? Number(plan.additionalToothPrice) : null,
				teethCountToApplyBulkPrice: plan.teethCountToApplyBulkPrice !== null ? Number(plan.teethCountToApplyBulkPrice) : null,

				// Clinical metadata
				notes: item.notes ?? null,
				shadeSystem: item.shadeSystem ?? null,
				baseShade: item.baseShade ?? null,
				stumpShade: item.stumpShade ?? null,
				shadeNotes: item.shadeNotes ?? null,

				selectedTeeth: teeth,
			};
		});

		const grandTotal = computedWorkItems.reduce((sum, i) => sum + i.totalPrice, 0);

		// ── Status re-evaluation ─────────────────────────────────────────────────
		// Only re-evaluate if the case is still in NEW or ASSIGNED.
		// PROCESSING cases keep their status — we don't revert a case that's
		// already in production just because staff assignments changed.

		const currentStatus = existingCase.status as CaseStatus;
		const isStatusReEvaluable = currentStatus === "NEW" || currentStatus === "ASSIGNED";

		let resolvedStatus = currentStatus;
		if (isStatusReEvaluable) {
			const hasTechnician = staffAssignments.some((s) => s.roleCategory === "TECHNICIAN" || s.roleCategory === "SENIOR_TECHNICIAN");
			resolvedStatus = hasTechnician ? "ASSIGNED" : "NEW";
		}

		// ── STEP 5: Build activity log diff ─────────────────────────────────────

		const scalarDiffs = buildScalarDiff(existingCase, {
			clinicId: clinicId ?? null,
			dentistId: dentistId ?? null,
			caseCategoryId: caseCategoryId ?? null,
			deadline,
			notes,
		});

		// ── STEP 6: Transaction ──────────────────────────────────────────────────
		// Everything that must be atomic: delete stale nested records,
		// update case scalars, create fresh work items + teeth + staff,
		// write activity log.

		const updatedCase = await prisma.$transaction(async (tx) => {
			// Delete all existing work items (cascades to SelectedTooth via schema)
			// Delete all existing staff assignments
			// These are separate deleteMany calls — Prisma doesn't support nested
			// delete in an update for one-to-many relations without a connect/disconnect.
			await Promise.all([
				tx.caseWorkItem.deleteMany({
					where: { dentalCaseId: caseId, labId },
				}),
				tx.caseStaffAssignment.deleteMany({
					where: { caseId, labId },
				}),
			]);

			// Update the case with fresh scalar values and recreate nested records
			const updated = await tx.case.update({
				where: { id: caseId, labId },
				data: {
					clinicId: emptyToNull(clinicId) ?? null,
					dentistId: emptyToNull(dentistId) ?? null,
					caseCategoryId: emptyToNull(caseCategoryId) ?? null,
					deadline: deadline ?? null,
					notes: notes?.trim() || null,
					grandTotal,
					status: resolvedStatus,

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
						staffAssignments.length > 0
							? {
									createMany: {
										data: staffAssignments.map((s) => ({
											staffId: s.staffId,
											roleCategory: s.roleCategory as StaffRoleCategory,
											commissionType: s.commissionType as CommissionType,
											commissionValue: s.commissionValue,
											commissionTotal: 0,
											isPaid: false,
											labId,
										})),
									},
								}
							: undefined,
				},
				select: {
					id: true,
					caseNumber: true,
					status: true,
					grandTotal: true,
				},
			});

			// Write activity log
			await tx.caseActivityLog.create({
				data: {
					caseId,
					labId,
					actorId: labUser.id,
					actorName,
					type: "CASE_UPDATED",
					summary: scalarDiffs.length > 0 ? `Case updated — ${scalarDiffs.map((d) => d.field).join(", ")} changed` : "Case work items or staff updated",
					payload: {
						scalarChanges: scalarDiffs,
						workItemsReplaced: {
							previousCount: null, // we didn't fetch the count pre-delete — add if needed
							newCount: computedWorkItems.length,
							newGrandTotal: grandTotal,
						},
						staffReplaced: {
							newCount: staffAssignments.length,
						},
						...(resolvedStatus !== currentStatus && {
							statusChanged: { from: currentStatus, to: resolvedStatus },
						}),
					} as CaseActivityLogCreateManyInput["payload"],
				},
			});

			return updated;
		});

		return {
			updatedCase: {
				...updatedCase,
				grandTotal: updatedCase.grandTotal !== null ? Number(updatedCase.grandTotal) : null,
			},
		};
	});
