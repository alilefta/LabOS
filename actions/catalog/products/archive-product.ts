'use server'

import { tenantPrisma } from '@/lib/prisma'
import { actionClientWithLab } from '@/lib/safe-action'
import { ERRORS } from '@/lib/errors'
import { ToggleArchiveEntityInputSchema } from '@/schema/composed/catalog/archive-entity.schema'

// ──  ARCHIVE / RESTORE PRODUCT ────────────────────────────────────────────
export const toggleArchiveProductAction = actionClientWithLab
	.metadata({
		actionName: 'Toggle-Archive-Product-Action',
		requiredLabRole: 'ADMIN',
	})
	.inputSchema(ToggleArchiveEntityInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { id, isArchived } = parsedInput
		const { labId } = ctx

		const prisma = await tenantPrisma(labId)

		// Security: Ensure it exists in this lab
		const exists = await prisma.product.findUnique({
			where: { id, labId },
			select: { id: true },
		})

		if (!exists) throw ERRORS.NOT_FOUND

		// Execute the Soft Delete / Restore
		await prisma.product.update({
			where: { id },
			data: { isArchived },
		})

		return { success: true, isArchived }
	})
