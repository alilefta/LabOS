'use server'

import { z } from 'zod'
import { tenantPrisma } from '@/lib/prisma'
import { actionClientWithLab } from '@/lib/safe-action'
import { ERRORS } from '@/lib/errors'
import { revalidatePath } from 'next/cache'

const MoveWorkTypeInputSchema = z.object({
	workTypeId: z.string().uuid('Invalid Work Type ID'),
	newCategoryId: z.string().uuid('Invalid Category ID'),
})

export const moveWorkTypeAction = actionClientWithLab
	.metadata({
		actionName: 'Move-WorkType-Action',
		// SECURITY: Restructuring the catalog is an admin-level task
		requiredLabRole: 'ADMIN',
	})
	.inputSchema(MoveWorkTypeInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { workTypeId, newCategoryId } = parsedInput
		const { labId } = ctx

		try {
			const prisma = await tenantPrisma(labId)

			// ── 1. SECURITY & INTEGRITY CHECK ───────────────────────────────
			// We must ensure BOTH the WorkType and the target Category exist
			// AND belong to the current Lab. We do this in parallel for speed.
			const [workTypeExists, newCategoryExists] = await Promise.all([
				prisma.workType.findUnique({
					where: { id: workTypeId, labId },
					select: { id: true, caseCategoryId: true }, // We need the old ID for logging/validation
				}),
				prisma.caseCategory.findUnique({
					where: { id: newCategoryId, labId },
					select: { id: true },
				}),
			])

			if (!workTypeExists || !newCategoryExists) {
				throw ERRORS.NOT_FOUND
			}

			// Prevent redundant operations
			if (workTypeExists.caseCategoryId === newCategoryId) {
				throw new Error('This department is already in the selected category.')
			}

			// ── 2. DATABASE UPDATE ───────────────────────────────────────
			const updatedWorkType = await prisma.workType.update({
				where: { id: workTypeId }, // Safe because we verified ownership above
				data: {
					caseCategoryId: newCategoryId,
				},
				select: {
					id: true,
					name: true,
					caseCategoryId: true,
				},
			})
			return { success: true, workType: updatedWorkType } // Map to DTO if needed, or just return success
		} catch (error) {
			console.error('[Move-WorkType-Action] Error:', error)
			if (error instanceof Error) throw error
			throw ERRORS.OPERATION_NOT_ALLOWED
		}
	})
