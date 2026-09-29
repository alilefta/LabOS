"use server";

import { tenantPrisma } from "@/lib/prisma";
import { actionClientWithLab } from "@/lib/safe-action";
import { executeCatalogWorkTypeCreate } from '@/modules/labos-files/catalog-worktype-image-command'
import { SearchInputSchema } from "@/schema/composed/shared-schema";
import { CreateWorkTypeInputSchema, GetWorkTypesByCategoryInputSchema } from "@/schema/composed/worktype.details";
import { APIError } from "better-auth";

export const createWorkTypeAction = actionClientWithLab
	.metadata({
		actionName: "Create-New-WorkType-Action",
		// Canonical tenant context remains required; Authorization V1 is final authority.
		requiredLabRole: null,
	})
	.inputSchema(CreateWorkTypeInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { name, description, caseCategoryId, requireTeethSelection, imageUploadGrantId } = parsedInput;
		const { labId } = ctx;

		try {
			const worktype = await executeCatalogWorkTypeCreate(ctx, {
				name,
				description,
				caseCategoryId,
				requireTeethSelection,
				imageUploadGrantId,
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
		requiredLabRole: "STAFF",
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
		requiredLabRole: "STAFF",
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
