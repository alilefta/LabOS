'use server'

import { actionClientWithLab } from '@/lib/safe-action'
import { ERRORS } from '@/lib/errors'
import {
	CatalogWorkTypeNotFoundError,
	CatalogWorkTypeParentCategoryNotFoundError,
	executeCatalogWorkTypeUpdate,
} from '@/modules/labos-files/catalog-worktype-image-command'
import { UpdateWorkTypeInputSchema } from '@/schema/composed/worktype.details'

export const updateWorkTypeAction = actionClientWithLab
	.metadata({
		actionName: 'Update-WorkType-Action',
		// Canonical tenant context remains required; Authorization V1 is final authority.
		requiredLabRole: null,
	})
	.inputSchema(UpdateWorkTypeInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const {
			workTypeId,
			name,
			description,
			imageUploadGrantId,
			requireTeethSelection,
			caseCategoryId,
		} = parsedInput

		try {
			const updatedWorkType = await executeCatalogWorkTypeUpdate(ctx, {
				workTypeId,
				name,
				description,
				caseCategoryId,
				requireTeethSelection,
				imageUploadGrantId,
			})

			return { success: true, worktype: updatedWorkType }
		} catch (error) {
			if (
				error instanceof CatalogWorkTypeNotFoundError ||
				error instanceof CatalogWorkTypeParentCategoryNotFoundError
			) throw ERRORS.NOT_FOUND
			console.error('[Update-WorkType-Action] Error:', error)
			if (error instanceof Error) throw error // Pass custom movement errors to the UI
			throw ERRORS.OPERATION_NOT_ALLOWED
		}
	})
