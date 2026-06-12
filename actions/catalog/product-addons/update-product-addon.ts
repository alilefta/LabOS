'use server'

import { tenantPrisma } from '@/lib/prisma'
import { actionClientWithLab } from '@/lib/safe-action'
import { ERRORS } from '@/lib/errors'
import { UpdateProductAddonInputSchema } from '@/schema/composed/catalog/product.schema'
import { ProductAddonDTO } from '@/schema/composed/catalog/product.dtos'

export const updateProductAddonAction = actionClientWithLab
	.metadata({ actionName: 'Update-Product-Addon', requiredLabRole: 'ADMIN' })
	.inputSchema(UpdateProductAddonInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { labId } = ctx
		const { addonId, name, price, isArchived } = parsedInput

		try {
			const prisma = await tenantPrisma(labId)
			const exists = await prisma.productAddon.findUnique({
				where: { id: addonId, labId },
			})
			if (!exists) throw ERRORS.NOT_FOUND

			const updated = await prisma.productAddon.update({
				where: { id: addonId },
				data: { name, price, isArchived: isArchived ?? false },
				select: { id: true, name: true, price: true, isArchived: true },
			})

			const addonDto: ProductAddonDTO = {
				id: updated.id,
				name: updated.name,
				price: Number(updated.price),
				isArchived: updated.isArchived,
			}

			return { addon: addonDto }
		} catch (error) {
			console.error('[Update-Addon] Error:', error)
			throw ERRORS.OPERATION_NOT_ALLOWED
		}
	})
