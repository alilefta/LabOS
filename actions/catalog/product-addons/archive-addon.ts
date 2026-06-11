'use server'

import { tenantPrisma } from '@/lib/prisma'
import { actionClientWithLab } from '@/lib/safe-action'
import { ERRORS } from '@/lib/errors'
import { ToggleArchiveEntityInputSchema } from '@/schema/composed/catalog/archive-entity.schema'

export const toggleArchiveProductAddonAction = actionClientWithLab
	.metadata({
		actionName: 'Toggle-Archive-Product-Addon-Action',
		requiredLabRole: 'ADMIN',
	})
	.inputSchema(ToggleArchiveEntityInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { id, isArchived } = parsedInput
		const { labId } = ctx

		try {
			const prisma = await tenantPrisma(labId)

			// 1. Security Check
			const exists = await prisma.productAddon.findUnique({
				where: { id, labId },
				select: { id: true },
			})

			if (!exists) throw ERRORS.NOT_FOUND

			// 2. Execute Soft Delete / Restore
			await prisma.productAddon.update({
				where: { id },
				data: { isArchived },
			})

			return { success: true, isArchived }
		} catch (error) {
			console.error('[Toggle-Archive-Product-Addon] Error:', error)
			throw ERRORS.OPERATION_NOT_ALLOWED
		}
	})
