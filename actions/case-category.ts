'use server'

import { actionClientWithLab } from '@/lib/safe-action'
import { tenantPrisma } from '@/lib/prisma'
import { executeCatalogCategoryCreate } from '@/modules/labos-files/catalog-category-image-command'
import {
	CreateCaseCategoryInputSchema,
	GetCaseCategoriesForCaseInputSchema,
} from '@/schema/composed/case-category.details'
import { SearchInputSchema } from '@/schema/composed/shared-schema'
import { APIError } from 'better-auth'

export const createCaseCategoryAction = actionClientWithLab
	.metadata({
		actionName: 'Create-New-CaseCategory-Action',
		// Canonical tenant context remains required; Authorization V1 is final authority.
		requiredLabRole: null,
	})
	.inputSchema(CreateCaseCategoryInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { name, description, isArchived, imageUploadGrantId } = parsedInput

		try {
			const category = await executeCatalogCategoryCreate(ctx, {
				name,
				description,
				isArchived,
				imageUploadGrantId,
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

export const getCaseCategoryBySearchQueryAction = actionClientWithLab
	.metadata({
		actionName: 'Get-CaseCategorys-By-Search-Query-Action',
		requiredLabRole: 'STAFF',
	})
	.inputSchema(SearchInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { searchQuery, limit } = parsedInput
		const { labId } = ctx

		try {
			const caseCategories = await (
				await tenantPrisma(labId)
			).caseCategory.findMany({
				where: {
					labId: labId,
					name: {
						startsWith: searchQuery,
					},
				},
				orderBy: {
					createdAt: 'desc',
				},
				take: limit,
			})

			return {
				categories: caseCategories,
			}
		} catch (e) {
			if (e instanceof APIError || e instanceof Error) {
				console.error(
					'[Get-CaseCategories-By-Search-Query-Action] Error',
					e.message,
				)
			}
			throw e
		}
	})

export const getCaseCategoriesAction = actionClientWithLab
	.metadata({
		actionName: 'Get-CaseCategorys-Action',
		requiredLabRole: 'STAFF',
	})
	.inputSchema(GetCaseCategoriesForCaseInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { limit } = parsedInput
		const { labId } = ctx

		try {
			const caseCategories = await (
				await tenantPrisma(labId)
			).caseCategory.findMany({
				where: {
					labId: labId,
				},
				orderBy: {
					createdAt: 'desc',
				},
				take: limit,
			})

			return {
				categories: caseCategories,
			}
		} catch (e) {
			if (e instanceof APIError || e instanceof Error) {
				console.error('[Get-CaseCategories-Action] Error', e.message)
			}
			throw e
		}
	})
