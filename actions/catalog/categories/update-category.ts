'use server'

import { actionClientWithLab } from '@/lib/safe-action'
import { ERRORS } from '@/lib/errors'
import {
	CatalogCategoryNotFoundError,
	executeCatalogCategoryUpdate,
} from '@/modules/labos-files/catalog-category-image-command'
import { UpdateCaseCategoryInputSchema } from '@/schema/composed/case-category.details'
import { APIError } from 'better-auth'

export const updateCaseCategoryAction = actionClientWithLab
	.metadata({
		actionName: 'Update-CaseCategory-Action',
		// Canonical tenant context remains required; Authorization V1 is final authority.
		requiredLabRole: null,
	})
	.inputSchema(UpdateCaseCategoryInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { categoryId, name, description, isArchived, imageUploadGrantId } =
			parsedInput

		try {
			const updatedCategory = await executeCatalogCategoryUpdate(ctx, {
				categoryId,
				name,
				description,
				isArchived,
				imageUploadGrantId,
			})

			return {
				category: updatedCategory,
			}
		} catch (e) {
			if (e instanceof CatalogCategoryNotFoundError) throw ERRORS.NOT_FOUND
			if (e instanceof APIError || e instanceof Error) {
				console.error('[Update-CaseCategory-Action] Error:', e.message)
			}
			throw ERRORS.OPERATION_NOT_ALLOWED
		}
	})
