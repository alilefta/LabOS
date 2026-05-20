"use server";

import { tenantPrisma } from "@/lib/prisma";
import { actionClientWithLab } from "@/lib/safe-action";
import { APIError } from "better-auth";
import { z } from "zod";

export type ProductOptionDTO = {
	id: string;
	productName: string;
	workTypeName: string;
	categoryName: string;
};

export const getProductsOptionsBySearchQueryAction = actionClientWithLab
	.metadata({
		actionName: "Get-Products-By-Search-Query-Action",
		requiredLabRole: "STAFF",
	})
	.inputSchema(
		z.object({
			searchQuery: z.string().optional(),
			limit: z.number().default(20),
		}),
	)
	.action(async ({ ctx, parsedInput }) => {
		const { labId } = ctx;
		const { searchQuery, limit } = parsedInput;
		try {
			const prisma = await tenantPrisma(labId);

			const products = await prisma.product.findMany({
				where: {
					labId,
					...(searchQuery?.trim() && {
						OR: [
							{ name: { contains: searchQuery.trim(), mode: "insensitive" } },
							{ workType: { name: { contains: searchQuery.trim(), mode: "insensitive" } } },
							{ workType: { caseCategory: { name: { contains: searchQuery.trim(), mode: "insensitive" } } } },
						],
					}),
				},
				take: limit,
				orderBy: { name: "asc" },
				select: {
					id: true,
					name: true,
					workType: {
						select: {
							name: true,
							caseCategory: { select: { name: true } },
						},
					},
				},
			});

			const options: ProductOptionDTO[] = products.map((p) => ({
				id: p.id,
				productName: p.name,
				workTypeName: p.workType.name,
				categoryName: p.workType.caseCategory.name,
			}));

			return { options };
		} catch (e) {
			if (e instanceof APIError || e instanceof Error) {
				console.error("[Get-Products-By-Search-Query-Action] Error", e.message);
			}
			throw e;
		}
	});
