'use server'

import { z } from 'zod'
import { tenantPrisma } from '@/lib/prisma'
import { actionClientWithLab } from '@/lib/safe-action'
import { ERRORS } from '@/lib/errors'
import { ProductDetailsDTO } from '@/schema/composed/catalog/product.schema'

export const getProductByIdAction = actionClientWithLab
	.metadata({
		actionName: 'Get-Product-By-Id-Action',
		requiredLabRole: 'STAFF', // View access is generally safe for staff
	})
	.inputSchema(
		z.object({
			productId: z.string().uuid(),
		}),
	)
	.action(async ({ parsedInput, ctx }) => {
		const { productId } = parsedInput
		const { labId } = ctx

		try {
			const prisma = await tenantPrisma(labId)

			// Strict tenant-isolated read [1]
			const product = await prisma.product.findUnique({
				where: { id: productId, labId },
				select: {
					id: true,
					name: true,
					description: true,
					imageUrl: true,
					workTypeId: true,
				},
			})

			if (!product) {
				throw ERRORS.NOT_FOUND
			}

			// Map to flat DTO [1]
			const productDto: ProductDetailsDTO = {
				id: product.id,
				name: product.name,
				description: product.description,
				imageUrl: product.imageUrl,
				workTypeId: product.workTypeId,
			}

			return { product: productDto }
		} catch (error) {
			console.error('[Get-Product-By-Id] Error:', error)
			throw ERRORS.OPERATION_NOT_ALLOWED
		}
	})
