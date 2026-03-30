"use server";

import { tenantPrisma } from "@/lib/prisma";
import { actionClientWithLab } from "@/lib/safe-action";
import { CreateCaseCategoryInputSchema, GetCaseCategoriesForCaseInputSchema } from "@/schema/composed/case-category.details";
import { SearchInputSchema } from "@/schema/composed/shared-schema";
import { APIError } from "better-auth";

export const createCaseCategoryAction = actionClientWithLab
	.metadata({
		actionName: "Create-New-CaseCategory-Action",
		requiredLabRole: "ADMIN",
	})
	.inputSchema(CreateCaseCategoryInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { name, description, imageUrl, isActive } = parsedInput;
		const { labId } = ctx;

		try {
			const category = await (
				await tenantPrisma(labId)
			).caseCategory.create({
				data: {
					name,
					description: description ?? null,
					imageUrl: imageUrl ?? null,
					isActive: isActive ?? true,
					labId: labId,
				},
				include: {
					lab: true,
				},
			});

			return {
				category,
			};
		} catch (e) {
			if (e instanceof APIError || e instanceof Error) {
				console.error("[Create-CaseCategory-Action] Error", e.message);
			}
			throw e;
		}
	});

export const getCaseCategoryBySearchQueryAction = actionClientWithLab
	.metadata({
		actionName: "Get-CaseCategorys-By-Search-Query-Action",
		requiredLabRole: "ADMIN",
	})
	.inputSchema(SearchInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { searchQuery, limit } = parsedInput;
		const { labId } = ctx;

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
					createdAt: "desc",
				},
				take: limit,
				include: {
					lab: true,
				},
			});

			return {
				categories: caseCategories,
			};
		} catch (e) {
			if (e instanceof APIError || e instanceof Error) {
				console.error("[Get-CaseCategories-By-Search-Query-Action] Error", e.message);
			}
			throw e;
		}
	});

export const getCaseCategoriesAction = actionClientWithLab
	.metadata({
		actionName: "Get-CaseCategorys-Action",
		requiredLabRole: "ADMIN",
	})
	.inputSchema(GetCaseCategoriesForCaseInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { limit } = parsedInput;
		const { labId } = ctx;

		try {
			const caseCategories = await (
				await tenantPrisma(labId)
			).caseCategory.findMany({
				where: {
					labId: labId,
				},
				orderBy: {
					createdAt: "desc",
				},
				take: limit,
				include: {
					lab: true,
				},
			});

			return {
				categories: caseCategories,
			};
		} catch (e) {
			if (e instanceof APIError || e instanceof Error) {
				console.error("[Get-CaseCategories-Action] Error", e.message);
			}
			throw e;
		}
	});
