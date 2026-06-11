'use server'

import { z } from 'zod'
import { tenantPrisma } from '@/lib/prisma'
import { actionClientWithLab } from '@/lib/safe-action'
import { ActionError, ERROR_CODES, ERRORS, STATUS_CODES } from '@/lib/errors'

const DeleteEntityInputSchema = z.object({
	id: z.string().uuid('Invalid entity ID'),
})

export const deleteCategoryAction = actionClientWithLab
	.metadata({
		actionName: 'Hard-Delete-Category-Action',
		requiredLabRole: 'OWNER', // SECURITY: Only the lab owner can perform hard deletes
	})
	.inputSchema(DeleteEntityInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { id } = parsedInput
		const { labId } = ctx

		try {
			const prisma = await tenantPrisma(labId)

			// ── 1. SECURITY & USAGE VERIFICATION ──────────────────────────────
			// We check if it exists, and critically, we count how many CASES
			// are attached to this category or any of its sub-worktypes.
			const category = await prisma.caseCategory.findUnique({
				where: { id, labId },
				include: {
					_count: {
						select: { cases: true },
					},
					workTypes: {
						select: {
							_count: { select: { caseWorkItems: true } },
						},
					},
				},
			})

			if (!category) throw ERRORS.NOT_FOUND

			// ── 2. THE PRODUCTION LOCKOUT GUARD ───────────────────────────────
			// Sum up all top-level cases AND all sub-level work items attached to this tree.
			const totalUsageCount =
				category._count.cases +
				category.workTypes.reduce((sum, wt) => sum + wt._count.caseWorkItems, 0)

			if (totalUsageCount > 0) {
				throw new ActionError(
					`DATABASE LOCKOUT: This category is tied to ${totalUsageCount} historical production records. You cannot delete it. Please 'Archive' it instead to preserve financial integrity.`,
					ERROR_CODES.OPERATION_NOT_ALLOWED,
					STATUS_CODES.BAD_REQUEST,
				)
			}

			// ── 3. SAFE DELETION (CASCADE) ────────────────────────────────────
			// Because totalUsageCount === 0, we know this category and all its
			// products/pricing plans were never actually sold to a clinic.
			// It is 100% safe to let Prisma Cascade-Delete the entire tree.
			await prisma.caseCategory.delete({
				where: { id },
			})

			return { success: true }
		} catch (error) {
			console.error('[Delete-Category] Error:', error)
			if (error instanceof Error) throw error // Pass our custom string to the UI toast
			throw ERRORS.OPERATION_NOT_ALLOWED
		}
	})
