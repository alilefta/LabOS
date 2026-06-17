'use server'

import { tenantPrisma } from '@/lib/prisma'
import { actionClientWithLab } from '@/lib/safe-action'
import { ERRORS } from '@/lib/errors'
import { UpdateWorkTypeInputSchema } from '@/schema/composed/worktype.details'

export const updateWorkTypeAction = actionClientWithLab
	.metadata({
		actionName: 'Update-WorkType-Action',
		requiredLabRole: 'ADMIN', // Catalog structure modifications require Admin
	})
	.inputSchema(UpdateWorkTypeInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { labId } = ctx
		const {
			workTypeId,
			name,
			description,
			imageUrl,
			requireTeethSelection,
			caseCategoryId,
		} = parsedInput

		try {
			const prisma = await tenantPrisma(labId)

			// ── 1. SECURITY & EXISTENCE CHECK ─────────────────────────────────
			// Verify the Work Type exists AND belongs to the authorized Lab Tenant
			const existingWorkType = await prisma.workType.findUnique({
				where: { id: workTypeId, labId },
				select: { id: true, caseCategoryId: true },
			})

			if (!existingWorkType) {
				throw ERRORS.NOT_FOUND
			}

			// ── 2. STRUCTURAL MOVEMENT GUARD ──────────────────────────────────
			// If the user provided a caseCategoryId, and it's DIFFERENT from the current one,
			// they are attempting to move this WorkType to a new Category.
			if (
				caseCategoryId &&
				caseCategoryId !== existingWorkType.caseCategoryId
			) {
				// We MUST verify that the destination Category actually belongs to this Lab!
				// (Prevents a malicious user from assigning a WorkType to a competitor's Category)
				const targetCategoryExists = await prisma.caseCategory.findUnique({
					where: { id: caseCategoryId, labId },
					select: { id: true },
				})

				if (!targetCategoryExists) {
					throw new Error('Invalid destination category.')
				}
			}

			// ── 3. EXECUTE UPDATE ─────────────────────────────────────────────
			const updatedWorkType = await prisma.workType.update({
				where: { id: workTypeId },
				data: {
					name,
					description: description ?? null,
					imageUrl: imageUrl ?? null,
					requireTeethSelection: requireTeethSelection ?? true,

					// If caseCategoryId was provided, update the relation.
					// Otherwise, leave it alone.
					...(caseCategoryId && { caseCategoryId }),
				},
				// Return minimal data for the client UI toast
				select: {
					id: true,
					name: true,
					caseCategoryId: true,
				},
			})

			return { success: true, worktype: updatedWorkType }
		} catch (error) {
			console.error('[Update-WorkType-Action] Error:', error)
			if (error instanceof Error) throw error // Pass custom movement errors to the UI
			throw ERRORS.OPERATION_NOT_ALLOWED
		}
	})
