'use server'

import { tenantPrisma } from '@/lib/prisma'
import { actionClientWithLab } from '@/lib/safe-action'
import { CreateCaseCategoryInputSchema } from '@/schema/composed/case-category.details'
import { APIError } from 'better-auth'

export const createCaseCategoryAction = actionClientWithLab
	.metadata({
		actionName: 'Create-New-CaseCategory-Action',
		requiredLabRole: 'ADMIN',
	})
	.inputSchema(CreateCaseCategoryInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { name, description, imageUrl, isArchived } = parsedInput
		const { labId } = ctx

		try {
			const category = await (
				await tenantPrisma(labId)
			).caseCategory.create({
				data: {
					name,
					description: description ?? null,
					imageUrl: imageUrl ?? null,
					isArchived: isArchived ?? true,
					labId: labId,
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
				category,
			}
		} catch (e) {
			if (e instanceof APIError || e instanceof Error) {
				console.error('[Create-CaseCategory-Action] Error', e.message)
			}
			throw e
		}
	})
