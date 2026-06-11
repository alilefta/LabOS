'use server'

import { tenantPrisma } from '@/lib/prisma'
import { actionClientWithLab } from '@/lib/safe-action'
import { ERRORS } from '@/lib/errors'
import { ToggleArchiveEntityInputSchema } from '@/schema/composed/catalog/archive-entity.schema'

// ── ARCHIVE / RESTORE CATEGORY (WITH CASCADE) ──────────────────────────────
export const toggleArchiveCategoryAction = actionClientWithLab
	.metadata({
		actionName: 'Toggle-Archive-Category-Action',
		requiredLabRole: 'ADMIN',
	})
	.inputSchema(ToggleArchiveEntityInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { id, isArchived } = parsedInput
		const { labId } = ctx

		const prisma = await tenantPrisma(labId)

		const exists = await prisma.caseCategory.findUnique({
			where: { id, labId },
			select: { id: true },
		})

		if (!exists) throw ERRORS.NOT_FOUND

		// 🔥 ATOMIC CASCADE TRANSACTION
		// If we hide a Category, we must hide its children so they
		// don't float around orphaned in the UI.
		await prisma.$transaction(async (tx) => {
			// 1. Archive the Category
			await tx.caseCategory.update({
				where: { id },
				data: { isArchived },
			})

			// 2. Cascade down to WorkTypes
			// Note: We don't need to cascade to Products because the UI will
			// block access to the WorkType anyway.
			if (isArchived) {
				await tx.workType.updateMany({
					where: { caseCategoryId: id },
					data: { isArchived: true },
				})
			}
		})

		return { success: true, isArchived }
	})
