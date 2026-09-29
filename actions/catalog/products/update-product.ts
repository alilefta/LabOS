'use server'

import { actionClientWithLab } from '@/lib/safe-action'
import { ERRORS } from '@/lib/errors'
import {
	CatalogProductNotFoundError,
	CatalogProductWorkTypeNotFoundError,
	executeCatalogProductUpdate,
} from '@/modules/labos-files/catalog-product-image-command'
import { UpdateProductInputSchema } from '@/schema/composed/catalog/product.schema'

export const updateProductAction = actionClientWithLab
	.metadata({
		actionName: 'Update-Product-Action',
		// Canonical tenant context remains required; Authorization V1 is final authority.
		requiredLabRole: null,
	})
	.inputSchema(UpdateProductInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { productId, name, description, imageUploadGrantId, workTypeId } = parsedInput

		try {
			const product = await executeCatalogProductUpdate(ctx, {
				productId,
				name,
				description,
				workTypeId,
				imageUploadGrantId,
			})

			return { success: true, product }
		} catch (error) {
			if (error instanceof CatalogProductNotFoundError || error instanceof CatalogProductWorkTypeNotFoundError) throw ERRORS.NOT_FOUND
			console.error('[Update-Product-Action] Error:', error)
			if (error instanceof Error) throw error
			throw ERRORS.OPERATION_NOT_ALLOWED
		}
	})
