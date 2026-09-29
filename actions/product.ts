"use server";

import { tenantPrisma } from "@/lib/prisma";
import { actionClientWithLab } from "@/lib/safe-action";
import { executeCatalogProductCreate } from '@/modules/labos-files/catalog-product-image-command'
import { CreateProductInputSchema } from "@/schema/composed/product.details";
import { SearchInputSchema } from "@/schema/composed/shared-schema";
import { GetProductsByWorkTypeInputSchema } from "@/schema/composed/worktype.details";
import { APIError } from "better-auth";

export const createProductAction = actionClientWithLab
	.metadata({
		actionName: "Create-New-Product-Action",
		// Canonical tenant context remains required; Authorization V1 is final authority.
		requiredLabRole: null,
	})
	.inputSchema(CreateProductInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { name, description, imageUploadGrantId, workTypeId } = parsedInput;

		try {
			const product = await executeCatalogProductCreate(ctx, {
				name,
				description,
				workTypeId,
				imageUploadGrantId,
			});

			return {
				product,
			};
		} catch (e) {
			if (e instanceof APIError || e instanceof Error) {
				console.error("[Create-Product-Action] Error", e.message);
			}
			throw e;
		}
	});

export const getProductBySearchQueryAction = actionClientWithLab
	.metadata({
		actionName: "Get-Products-By-Search-Query-Action",
		requiredLabRole: "ADMIN",
	})
	.inputSchema(SearchInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { searchQuery, limit } = parsedInput;
		const { labId } = ctx;

		try {
			const products = await (
				await tenantPrisma(labId)
			).product.findMany({
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
				products,
			};
		} catch (e) {
			if (e instanceof APIError || e instanceof Error) {
				console.error("[Get-Products-By-Search-Query-Action] Error", e.message);
			}
			throw e;
		}
	});

export const getProductsByWorkTypeAction = actionClientWithLab
	.metadata({
		actionName: "Get-Products-By-WorkTypeId-Action",
		requiredLabRole: "ADMIN",
	})
	.inputSchema(GetProductsByWorkTypeInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { limit, workTypeId } = parsedInput;
		const { labId } = ctx;

		try {
			const products = await (
				await tenantPrisma(labId)
			).product.findMany({
				where: {
					labId: labId,
					workTypeId: workTypeId,
				},
				orderBy: {
					createdAt: "desc",
				},
				take: limit,
				include: {
					lab: true,
					workType: true,
				},
			});

			return {
				products,
			};
		} catch (e) {
			if (e instanceof APIError || e instanceof Error) {
				console.error("[Get-Products-By-WorkTypeId-Action] Error", e.message);
			}
			throw e;
		}
	});
