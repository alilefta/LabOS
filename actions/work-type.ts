"use server";

import { tenantPrisma } from "@/lib/prisma";
import { actionClientWithLab } from "@/lib/safe-action";
import { SearchInputSchema } from "@/schema/composed/shared-schema";
import { CreateWorkTypeInputSchema, GetWorkTypesByCategoryInputSchema } from "@/schema/composed/worktype.details";
import { APIError } from "better-auth";

export const createWorkTypeAction = actionClientWithLab
	.metadata({
		actionName: "Create-New-WorkType-Action",
		requiredLabRole: "ADMIN",
	})
	.inputSchema(CreateWorkTypeInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { name, description, imageUrl, caseCategoryId, requireTeethSelection } = parsedInput;
		const { labId } = ctx;

		try {
			const worktype = await (
				await tenantPrisma(labId)
			).workType.create({
				data: {
					name,
					description: description ?? null,
					imageUrl: imageUrl ?? null,
					requireTeethSelection: requireTeethSelection ?? true,
					labId: labId,
					caseCategoryId: caseCategoryId,
				},
				include: {
					lab: true,
				},
			});

			return {
				worktype,
			};
		} catch (e) {
			if (e instanceof APIError || e instanceof Error) {
				console.error("[Create-WorkType-Action] Error", e.message);
			}
			throw e;
		}
	});

export const getWorkTypeBySearchQueryAction = actionClientWithLab
	.metadata({
		actionName: "Get-WorkTypes-By-Search-Query-Action",
		requiredLabRole: "ADMIN",
	})
	.inputSchema(SearchInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { searchQuery, limit } = parsedInput;
		const { labId } = ctx;

		try {
			const worktypes = await (
				await tenantPrisma(labId)
			).workType.findMany({
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
				worktypes,
			};
		} catch (e) {
			if (e instanceof APIError || e instanceof Error) {
				console.error("[Get-WorkTypes-By-Search-Query-Action] Error", e.message);
			}
			throw e;
		}
	});

export const getWorkTypesByCategoryAction = actionClientWithLab
	.metadata({
		actionName: "Get-WorkTypes-By-CategoryId-Action",
		requiredLabRole: "ADMIN",
	})
	.inputSchema(GetWorkTypesByCategoryInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { limit, caseCategoryId, requireTeethSelection } = parsedInput;
		const { labId } = ctx;

		try {
			const workTypes = await (
				await tenantPrisma(labId)
			).workType.findMany({
				where: {
					labId: labId,
					caseCategoryId: caseCategoryId,
					requireTeethSelection,
				},
				orderBy: {
					createdAt: "desc",
				},
				take: limit,
				include: {
					products: true,
				},
			});

			return {
				workTypes,
			};
		} catch (e) {
			if (e instanceof APIError || e instanceof Error) {
				console.error("[Get-WorkTypes-By-CategoryId-Action] Error", e.message);
			}
			throw e;
		}
	});
