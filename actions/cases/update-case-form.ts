'use server'

// actions/cases/update-case-form.ts
// ─────────────────────────────────────────────────────────────────────────────
// updateDentalCaseAction — full case edit form submission.
//
// Immutable fields (never accepted from client):
//   - patientId, caseNumber, status (status is server-re-evaluated), grandTotal
//
// Editable fields:
//   - clinicId, dentistId, caseCategoryId, deadline, notes
//
// Replace-all children:
//   - caseWorkItems  → delete all → recompute → create fresh
//   - staffAssignments → delete all → create fresh
//
// Additive/selective children:
//   - caseAssetFiles → new files created, existing files title/description
//     updated in-place, files absent from the payload are DELETED
//
// Status re-evaluation:
//   - Only when current status is NEW or ASSIGNED
//   - PROCESSING / FAILED cases keep their status — don't revert production
//
// Security:
//   - labId from ctx only, never client input
//   - All referenced entity IDs verified against ctx.labId
//   - COMPLETED / DELIVERED cases are locked from editing
// ─────────────────────────────────────────────────────────────────────────────

import { revalidatePath } from 'next/cache'
import {
	CaseStatus,
	CommissionType,
	StaffRoleCategory,
} from '@/generated/prisma/client'
import { CaseActivityLogCreateManyInput } from '@/generated/prisma/models'
import {
	buildLogEntry,
	resolveActorName,
} from '@/data/activity-logs/build-activity-log'
import { ActionError, ERRORS } from '@/lib/errors'
import { tenantPrisma } from '@/lib/prisma'
import { actionClientWithLab } from '@/lib/safe-action'
import { computeCaseItemPrice } from '@/lib/server-only-helpers'
import { UpdateCaseInputSchema } from '@/schema/composed/case.details'
import z from 'zod'
import { CaseUpdatedPayloadSchema } from '@/schema/composed/case-activity-logs.details'
import {
	NON_EDITABLE_STATUSES,
	RE_EVALUABLE_STATUSES,
} from '@/lib/permissions/cases/clinical-status-rules'

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

const TECHNICIAN_ROLES: StaffRoleCategory[] = [
	'TECHNICIAN',
	'SENIOR_TECHNICIAN',
]

// ─────────────────────────────────────────────────────────────────────────────
// Diff helpers
// ─────────────────────────────────────────────────────────────────────────────

type ScalarDiff = { field: string; from: unknown; to: unknown }

function buildScalarDiff(
	existing: {
		clinicId: string | null
		dentistId: string | null
		caseCategoryId: string | null
		deadline: string | null
		notes: string | null
	},
	incoming: {
		clinicId?: string
		dentistId?: string
		caseCategoryId?: string
		deadline?: string
		notes?: string
	},
): ScalarDiff[] {
	const diffs: ScalarDiff[] = []

	const toStr = (v: Date | string | null | undefined): string | null =>
		v instanceof Date ? v.toISOString() : (v ?? null)

	const pairs: Array<[keyof typeof existing, unknown]> = [
		['clinicId', incoming.clinicId ?? null],
		['dentistId', incoming.dentistId ?? null],
		['caseCategoryId', incoming.caseCategoryId ?? null],
		['deadline', toStr(incoming.deadline)],
		['notes', incoming.notes?.trim() || null],
	]

	for (const [field, incomingVal] of pairs) {
		const existingVal =
			field === 'deadline'
				? toStr(existing[field] as Date | null)
				: existing[field]
		if (existingVal !== incomingVal) {
			diffs.push({ field, from: existingVal, to: incomingVal })
		}
	}

	return diffs
}

// ─────────────────────────────────────────────────────────────────────────────
// Action
// ─────────────────────────────────────────────────────────────────────────────

export const updateDentalCaseAction = actionClientWithLab
	.metadata({ actionName: 'updateDentalCase', requiredLabRole: 'ADMIN' })
	.inputSchema(UpdateCaseInputSchema)
	.action(async ({ ctx, parsedInput }) => {
		const { labId, labUser } = ctx
		const {
			caseId,
			clinicId,
			dentistId,
			caseCategoryId,
			deadline,
			notes,
			caseWorkItems,
			caseAssetFiles,
			staffAssignments,
		} = parsedInput

		const prisma = await tenantPrisma(labId)

		// ── STEP 1: Fetch existing case ──────────────────────────────────────────
		// Include current work item count and asset file IDs for accurate diffing
		// and for determining which asset files to delete.

		const existingCase = await prisma.case.findUnique({
			where: { id: caseId, labId },
			select: {
				id: true,
				labId: true,
				status: true,
				clinicId: true,
				dentistId: true,
				caseCategoryId: true,
				deadline: true,
				notes: true,
				grandTotal: true,
				_count: {
					select: {
						caseItems: true,
						staffAssignments: true,
					},
				},
				// We need existing asset file IDs to determine deletions
				caseAssetFiles: {
					where: { labId },
					select: { id: true },
				},
				invoiceCase: { select: { invoiceId: true } },
			},
		})

		if (!existingCase) throw ERRORS.CASE_NOT_FOUND
		if (existingCase.labId !== labId) throw ERRORS.FORBIDDEN

		// The Immutability Guard:
		if (existingCase.invoiceCase) {
			throw ERRORS.CASE_ALREADY_INVOICED
		}

		// ── Status gate ──────────────────────────────────────────────────────────

		if (NON_EDITABLE_STATUSES.includes(existingCase.status as CaseStatus)) {
			throw new ActionError(
				`Case cannot be edited in ${existingCase.status} status`,
				'OPERATION_NOT_ALLOWED',
				400,
			)
		}

		// ── STEP 2: Parallel entity verification ────────────────────────────────
		// All queries are scoped to labId — null return = not found OR wrong lab.
		// Run everything in parallel for minimum latency.

		const validWorkItems = caseWorkItems.filter(
			(i) => i.productId && i.casePricingPlanId,
		)
		const pricingPlanIds = [
			...new Set(validWorkItems.map((i) => i.casePricingPlanId)),
		]
		const staffIds = (staffAssignments ?? []).map((s) => s.staffId)

		// Determine which existing asset files to keep vs delete.
		// "keep" = the client sent back an existing file record (isNew: false).
		// Anything NOT in this set gets deleted.
		const incomingExistingFileIds = new Set(
			(caseAssetFiles ?? [])
				.filter((f) => !f.isNew)
				.map((f) => (!f.isNew ? f.id : '')),
		)
		const existingFileIds = existingCase.caseAssetFiles.map((f) => f.id)
		const fileIdsToDelete = existingFileIds.filter(
			(id) => !incomingExistingFileIds.has(id),
		)

		const [clinic, dentist, category, pricingPlans, staffMembers, actorName] =
			await Promise.all([
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
							select: { id: true, isArchived: true },
						})
					: Promise.resolve(null),

				pricingPlanIds.length > 0
					? prisma.casePricingPlan.findMany({
							where: { id: { in: pricingPlanIds }, labId },
						})
					: Promise.resolve([]),

				staffIds.length > 0
					? prisma.labStaff.findMany({
							where: { id: { in: staffIds }, labId },
							select: {
								id: true,
								isActive: true,
								roleCategory: true,
								firstName: true,
								lastName: true,
							},
						})
					: Promise.resolve([]),

				resolveActorName(labUser.id, labId),
			])

		// ── STEP 3: Business rule validation ────────────────────────────────────

		if (clinicId) {
			if (!clinic) throw ERRORS.NOT_FOUND
			if (clinic.status === 'SUSPENDED') throw ERRORS.OPERATION_NOT_ALLOWED
		}

		if (dentistId) {
			if (!dentist) throw ERRORS.NOT_FOUND
			if (dentist.clinicId !== clinicId) {
				throw new ActionError(
					'The selected dentist does not belong to the selected clinic',
					'INVALID_INPUT',
					400,
				)
			}
		}

		if (caseCategoryId) {
			if (!category) throw ERRORS.NOT_FOUND
			if (!category.isArchived) throw ERRORS.OPERATION_NOT_ALLOWED
		}

		// All pricing plans must exist within this lab
		const pricingPlanMap = new Map(pricingPlans.map((pp) => [pp.id, pp]))
		for (const item of validWorkItems) {
			if (!pricingPlanMap.has(item.casePricingPlanId)) throw ERRORS.NOT_FOUND
		}

		// All staff must be active members of this lab
		// Also enforce no duplicate staffIds in the incoming payload
		if (staffIds.length > 0) {
			const uniqueStaffIds = new Set(staffIds)
			if (uniqueStaffIds.size !== staffIds.length) throw ERRORS.INVALID_INPUT

			const staffMap = new Map(staffMembers.map((s) => [s.id, s]))
			for (const assignment of staffAssignments ?? []) {
				const member = staffMap.get(assignment.staffId)
				if (!member) throw ERRORS.NOT_MEMBER
				if (!member.isActive) {
					throw new ActionError(
						`Staff member ${assignment.staffId} is inactive and cannot be assigned`,
						'OPERATION_NOT_ALLOWED',
						400,
					)
				}
			}
		}

		// ── STEP 4: Server-side price recomputation ──────────────────────────────
		// Client-sent totalPrice / grandTotal are discarded entirely.

		const computedWorkItems = validWorkItems.map((item) => {
			const plan = pricingPlanMap.get(item.casePricingPlanId)!
			const teeth = item.selectedTeeth?.map((t) => t.toothPosition) ?? []
			const totalPrice = computeCaseItemPrice(plan, teeth, item.jawType)

			return {
				productId: item.productId ?? null,
				workTypeId: item.workTypeId ?? null,
				casePricingPlanId: plan.id,
				jawType: item.jawType,

				// Server-computed — never trust the client value
				totalPrice,

				// Pricing snapshot — frozen at time of save so history is preserved
				// even if the plan's rates are changed later
				pricingStrategy: plan.pricingStrategy,
				bulkPrice: plan.bulkPrice !== null ? Number(plan.bulkPrice) : null,
				toothPrice: plan.toothPrice !== null ? Number(plan.toothPrice) : null,
				firstToothPrice:
					plan.firstToothPrice !== null ? Number(plan.firstToothPrice) : null,
				additionalToothPrice:
					plan.additionalToothPrice !== null
						? Number(plan.additionalToothPrice)
						: null,
				teethCountToApplyBulkPrice:
					plan.teethCountToApplyBulkPrice !== null
						? Number(plan.teethCountToApplyBulkPrice)
						: null,

				// Clinical metadata
				notes: item.notes ?? null,
				shadeSystem: item.shadeSystem ?? null,
				baseShade: item.baseShade ?? null,
				stumpShade: item.stumpShade ?? null,
				shadeNotes: item.shadeNotes ?? null,

				selectedTeeth: teeth,
			}
		})

		const grandTotal = computedWorkItems.reduce(
			(sum, i) => sum + i.totalPrice,
			0,
		)

		// ── Status re-evaluation ─────────────────────────────────────────────────
		// Only mutate status when the case is still in an early stage.
		// A PROCESSING case keeps PROCESSING regardless of staff changes.

		const currentStatus = existingCase.status as CaseStatus
		let resolvedStatus = currentStatus

		if (RE_EVALUABLE_STATUSES.includes(currentStatus)) {
			const hasTechnician = (staffAssignments ?? []).some((s) =>
				TECHNICIAN_ROLES.includes(s.roleCategory as StaffRoleCategory),
			)
			resolvedStatus = hasTechnician ? 'ASSIGNED' : 'NEW'
		}

		// ── STEP 5: Build activity log payload ───────────────────────────────────

		const scalarDiffs = buildScalarDiff(
			{
				...existingCase,
				deadline: existingCase.deadline
					? existingCase.deadline.toString()
					: null,
			},
			{
				clinicId,
				dentistId,
				caseCategoryId,
				deadline: deadline ? deadline.toString() : undefined,
				notes,
			},
		)

		const staffMap = new Map(staffMembers.map((s) => [s.id, s]))

		// ── STEP 6: Transaction ──────────────────────────────────────────────────
		// Atomic unit:
		//   1. Delete stale work items (cascades → SelectedTooth via schema)
		//   2. Delete stale staff assignments
		//   3. Delete asset files the user removed
		//   4. Update existing asset file metadata (title/description)
		//   5. Update case scalars + create fresh work items + staff + new asset files
		//   6. Write CASE_UPDATED activity log entry

		const updatedCase = await prisma.$transaction(
			async (tx) => {
				// ── 6a. Delete stale children in parallel ──────────────────────
				const deleteOps: Promise<unknown>[] = [
					tx.caseWorkItem.deleteMany({
						where: { dentalCaseId: caseId, labId },
					}),
					tx.caseStaffAssignment.deleteMany({ where: { caseId, labId } }),
				]

				if (fileIdsToDelete.length > 0) {
					deleteOps.push(
						tx.caseAssetFile.deleteMany({
							where: {
								id: { in: fileIdsToDelete },
								dentalCaseId: caseId,
								labId,
							},
						}),
					)
				}

				await Promise.all(deleteOps)

				// ── 6b. Update existing asset file metadata in parallel ────────
				// Files the user kept but may have renamed/re-described.
				const existingFileUpdates = (caseAssetFiles ?? [])
					.filter((f) => !f.isNew)
					.map((f) => {
						if (f.isNew) return Promise.resolve() // narrow type, never reached
						return tx.caseAssetFile.update({
							where: { id: f.id, dentalCaseId: caseId, labId },
							data: {
								title: f.title ?? null,
								description: f.description ?? null,
							},
						})
					})

				if (existingFileUpdates.length > 0) {
					await Promise.all(existingFileUpdates)
				}

				// ── 6c. Update case + recreate work items, staff, new files ───
				const newAssetFiles = (caseAssetFiles ?? []).filter((f) => f.isNew)

				const updated = await tx.case.update({
					where: { id: caseId, labId },
					data: {
						clinicId: clinicId ?? null,
						dentistId: dentistId ?? null,
						caseCategoryId: caseCategoryId ?? null,
						deadline: deadline ?? null,
						notes: notes?.trim() || null,
						grandTotal,
						status: resolvedStatus,

						// Replace-all: work items
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
											teethCountToApplyBulkPrice:
												item.teethCountToApplyBulkPrice,
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

						// Replace-all: staff assignments
						staffAssignments:
							(staffAssignments ?? []).length > 0
								? {
										createMany: {
											data: staffAssignments!.map((s) => ({
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

						// Additive: only new files (existing ones updated in 6b)
						caseAssetFiles:
							newAssetFiles.length > 0
								? {
										createMany: {
											data: newAssetFiles.map((f) => ({
												title: f.isNew ? (f.title ?? null) : null,
												description: f.isNew ? (f.description ?? null) : null,
												documentUrl: f.documentUrl,
												assetFileType: f.assetFileType,
												fileExtension: f.fileExtension,
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
				})

				// ── 6d. Build and write the CASE_UPDATED activity log ─────────

				const activityLogs: CaseActivityLogCreateManyInput[] = []
				const prevStaffCount = existingCase._count?.staffAssignments ?? 0
				const newStaffCount = (staffAssignments ?? []).length
				const staffChanged = prevStaffCount > 0 || newStaffCount > 0

				const prevAssetCount = (caseAssetFiles ?? []).filter(
					(f) => !f.isNew,
				).length
				const newAssetCount = (caseAssetFiles ?? []).length
				const assetsChanged = prevAssetCount !== newAssetCount
				// Main update entry with full structured diff
				activityLogs.push(
					buildLogEntry({
						caseId,
						labId,
						actorId: labUser.id,
						actorName,
						type: 'CASE_UPDATED',
						summary:
							scalarDiffs.length > 0
								? `Case details modified (${scalarDiffs.map((d) => d.field).join(', ')})`
								: 'Case configuration updated',
						payload: {
							scalarChanges: scalarDiffs.length > 0 ? scalarDiffs : null,

							workItemsReplaced: {
								previousCount: existingCase._count?.caseItems ?? 0,
								newCount: computedWorkItems.length,
								newGrandTotal: grandTotal,
							},

							staffReplaced: staffChanged
								? {
										previousCount: prevStaffCount,
										newCount: newStaffCount,
									}
								: null,

							caseAssetFiles: assetsChanged
								? {
										previousCount: prevAssetCount,
										newCount: newAssetCount,
									}
								: null,

							statusChanged:
								resolvedStatus !== currentStatus
									? {
											from: currentStatus,
											to: resolvedStatus,
										}
									: null,
						} as z.infer<typeof CaseUpdatedPayloadSchema>, // Now it will typecheck perfectly
					}),
				)

				// Granular staff assignment logs — one entry per new assignment
				// so the Audit Trail shows individual names, not just a count
				for (const assignment of staffAssignments ?? []) {
					const staffData = staffMap.get(assignment.staffId)
					if (staffData) {
						activityLogs.push(
							buildLogEntry({
								caseId,
								labId,
								actorId: labUser.id,
								actorName,
								type: 'STAFF_ASSIGNED',
								summary: `${staffData.firstName} ${staffData.lastName} assigned as ${assignment.roleCategory.toLowerCase().replace(/_/g, ' ')}`,
								payload: {
									staffId: assignment.staffId,
									staffName: `${staffData.firstName} ${staffData.lastName}`,
									roleCategory: assignment.roleCategory,
								},
							}),
						)
					}
				}

				// New file upload logs
				for (const file of newAssetFiles) {
					if (file.isNew) {
						activityLogs.push(
							buildLogEntry({
								caseId,
								labId,
								actorId: labUser.id,
								actorName,
								type: 'FILE_UPLOADED',
								summary: `Attached ${file.assetFileType}: ${file.title || 'Asset'}`,
								payload: {
									fileId: file.documentUrl,
									fileName: file.title || 'Clinical Asset',
									assetFileType: file.assetFileType,
								},
							}),
						)
					}
				}

				// Deleted file logs
				for (const fileId of fileIdsToDelete) {
					activityLogs.push(
						buildLogEntry({
							caseId,
							labId,
							actorId: labUser.id,
							actorName,
							type: 'FILE_DELETED',
							summary: 'Clinical asset removed',
							payload: { fileId, fileName: 'Unknown' },
						}),
					)
				}

				if (activityLogs.length > 0) {
					await tx.caseActivityLog.createMany({ data: activityLogs })
				}

				return updated
			},
			{ maxWait: 5000, timeout: 15000 },
		)

		// ── STEP 7: Revalidate ───────────────────────────────────────────────────
		revalidatePath(`/cases/${caseId}`)
		revalidatePath('/cases')

		return {
			updatedCase: {
				...updatedCase,
				grandTotal:
					updatedCase.grandTotal !== null
						? Number(updatedCase.grandTotal)
						: null,
			},
		}
	})
