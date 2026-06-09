'use server'

import { tenantPrisma } from '@/lib/prisma'
import { actionClientWithLab } from '@/lib/safe-action'
import { ERRORS } from '@/lib/errors'
import { UpdateProductInputSchema } from '@/schema/composed/catalog/product.schema'

export const updateProductAction = actionClientWithLab
	.metadata({
		actionName: 'Update-Product-Action',
		requiredLabRole: 'ADMIN', // Catalog modifications usually require elevated privileges
	})
	.inputSchema(UpdateProductInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { labId } = ctx
		const { productId, name, description, imageUrl, workTypeId } = parsedInput

		try {
			const prisma = await tenantPrisma(labId)

			// 1. Verify the product exists AND belongs to the lab
			const productExists = await prisma.product.findUnique({
				where: { id: productId, labId },
				select: { id: true },
			})

			if (!productExists) {
				throw ERRORS.NOT_FOUND
			}

			// 2. Cross-Relation Security Check [1]
			// If they changed the workTypeId (moving it to another department),
			// we must verify that new WorkType also belongs to this lab!
			const workTypeExists = await prisma.workType.findUnique({
				where: { id: workTypeId, labId },
				select: { id: true },
			})

			if (!workTypeExists) {
				throw ERRORS.INVALID_INPUT
			}

			// 3. Execute the Update
			const updatedProduct = await prisma.product.update({
				where: { id: productId },
				data: {
					name,
					description: description ?? null,
					imageUrl: imageUrl ?? null,
					workTypeId,
				},
				select: { id: true, name: true }, // Return minimum required metadata
			})

			return { success: true, product: updatedProduct }
		} catch (error) {
			console.error('[Update-Product-Action] Error:', error)
			throw ERRORS.OPERATION_NOT_ALLOWED
		}
	})
