'use server'

import { tenantPrisma } from '@/lib/prisma'
import { actionClientWithLab } from '@/lib/safe-action'
import { ERRORS } from '@/lib/errors'
import { UpdateCaseCategoryInputSchema } from '@/schema/composed/case-category.details'
import { APIError } from 'better-auth'

export const updateCaseCategoryAction = actionClientWithLab
	.metadata({
		actionName: 'Update-CaseCategory-Action',
		requiredLabRole: 'ADMIN', // Best practice: Only Managers/Owners should alter catalog structure
	})
	.inputSchema(UpdateCaseCategoryInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { categoryId, name, description, imageUrl, isArchived } = parsedInput
		const { labId } = ctx

		try {
			const prisma = await tenantPrisma(labId)

			// SECURITY CHECK: Ensure the category exists and belongs to this specific lab
			const existingCategory = await prisma.caseCategory.findUnique({
				where: { id: categoryId, labId },
			})

			if (!existingCategory) {
				throw ERRORS.NOT_FOUND
			}

			// PERFORM UPDATE
			const updatedCategory = await prisma.caseCategory.update({
				where: {
					id: categoryId,
					labId, // Extra security assertion
				},
				data: {
					// Using undefined allows Prisma to ignore the field if it wasn't provided in the payload
					name: name !== undefined ? name : undefined,
					description:
						description !== undefined ? (description ?? null) : undefined,
					imageUrl: imageUrl !== undefined ? (imageUrl ?? null) : undefined,
					isArchived: isArchived !== undefined ? isArchived : undefined,
				},
				select: {
					id: true,
					name: true,
					description: true,
					imageUrl: true,
					isArchived: true,
				},
			})

			return {
				category: updatedCategory,
			}
		} catch (e) {
			if (e instanceof APIError || e instanceof Error) {
				console.error('[Update-CaseCategory-Action] Error:', e.message)
			}
			throw ERRORS.OPERATION_NOT_ALLOWED
		}
	})
