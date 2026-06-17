'use server'

import { z } from 'zod'
import { tenantPrisma } from '@/lib/prisma'
import { actionClientWithLab } from '@/lib/safe-action'
import { ERRORS } from '@/lib/errors'
import { APIError } from 'better-auth'

// We keep the input schema inline for simple fetch actions
const GetCategoryInputSchema = z.object({
	categoryId: z.string().uuid('Invalid category ID'),
})

export const getCategoryByIdAction = actionClientWithLab
	.metadata({
		actionName: 'Get-Category-By-Id-Action',
		requiredLabRole: 'STAFF', // Anyone with lab access can view category details
	})
	.inputSchema(GetCategoryInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { categoryId } = parsedInput
		const { labId } = ctx

		try {
			const prisma = await tenantPrisma(labId)

			// Fetch the specific category, ensuring it belongs to the current lab tenant
			const category = await prisma.caseCategory.findUnique({
				where: {
					id: categoryId,
					labId,
				},
				// We don't need the nested relational data (like workTypes)
				// just to populate the edit form, so we keep the select payload light.
				select: {
					id: true,
					name: true,
					description: true,
					imageUrl: true,
					isArchived: true,
				},
			})

			if (!category) {
				throw ERRORS.NOT_FOUND
			}

			return {
				category,
			}
		} catch (e) {
			if (e instanceof APIError || e instanceof Error) {
				console.error('[Get-Category-By-Id-Action] Error:', e.message)
			}
			throw ERRORS.NOT_FOUND
		}
	})
