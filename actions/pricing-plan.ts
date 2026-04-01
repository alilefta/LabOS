"use server";

import { CasePricingPlanModel } from "@/generated/prisma/models";
import { tenantPrisma } from "@/lib/prisma";
import { actionClientWithLab } from "@/lib/safe-action";
import {
	CasePricingPlanDetailsUI,
	CreateCaseItemPricingPlanInputSchema,
	GetPricingPlansByClinicIdInputSchema,
	GetPricingPlansByProductIdInputSchema,
} from "@/schema/composed/case-pricing-plan.details";
import { SearchInputSchema } from "@/schema/composed/shared-schema";
import { APIError } from "better-auth";

export const createPricingPlanAction = actionClientWithLab
	.metadata({
		actionName: "Create-New-PricingPlan-Action",
		requiredLabRole: "ADMIN",
	})
	.inputSchema(CreateCaseItemPricingPlanInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { name, isDefault, pricingStrategy, additionalToothPrice, bulkPrice, clinicId, firstToothPrice, productId, teethCountToApplyBulkPrice, toothPrice } = parsedInput;
		const { labId } = ctx;

		try {
			const pricingPlan = await (
				await tenantPrisma(labId)
			).casePricingPlan.create({
				data: {
					name,
					labId: labId,
					productId,
					pricingStrategy: pricingStrategy,
					clinicId,
					toothPrice: toothPrice ?? null,
					firstToothPrice: firstToothPrice ?? null,
					additionalToothPrice: additionalToothPrice ?? null,
					bulkPrice: bulkPrice ?? null,
					teethCountToApplyBulkPrice: teethCountToApplyBulkPrice ?? null,
					isDefault,
				},
				include: {
					lab: true,
				},
			});

			return {
				pricingPlan: pricingPlansNormalizer(pricingPlan) as CasePricingPlanDetailsUI,
			};
		} catch (e) {
			if (e instanceof APIError || e instanceof Error) {
				console.error("[Create-PricingPlan-Action] Error", e.message);
			}
			throw e;
		}
	});

export const getPricingPlanBySearchQueryAction = actionClientWithLab
	.metadata({
		actionName: "Get-PricingPlans-By-Search-Query-Action",
		requiredLabRole: "ADMIN",
	})
	.inputSchema(SearchInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { searchQuery, limit } = parsedInput;
		const { labId } = ctx;

		try {
			const pricings = await (
				await tenantPrisma(labId)
			).casePricingPlan.findMany({
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
				pricings: pricingPlansNormalizer(pricings),
			};
		} catch (e) {
			if (e instanceof APIError || e instanceof Error) {
				console.error("[Get-PricingPlans-By-Search-Query-Action] Error", e.message);
			}
			throw e;
		}
	});

export const getPricingPlansByProductAction = actionClientWithLab
	.metadata({
		actionName: "Get-PricingPlans-By-ProductId-Action",
		requiredLabRole: "ADMIN",
	})
	.inputSchema(GetPricingPlansByProductIdInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { limit, productId } = parsedInput;
		const { labId } = ctx;

		try {
			const pricings = await (
				await tenantPrisma(labId)
			).casePricingPlan.findMany({
				where: {
					labId: labId,
					productId: productId,
				},
				orderBy: {
					createdAt: "desc",
				},
				take: limit,
				include: {
					lab: true,
					product: true,
				},
			});

			return {
				pricings: pricingPlansNormalizer(pricings),
			};
		} catch (e) {
			if (e instanceof APIError || e instanceof Error) {
				console.error("[Get-PricingPlans-By-ProductId-Action] Error", e.message);
			}
			throw e;
		}
	});

export const getPricingPlansByClinicAction = actionClientWithLab
	.metadata({
		actionName: "Get-PricingPlans-By-ClinicId-Action",
		requiredLabRole: "ADMIN",
	})
	.inputSchema(GetPricingPlansByClinicIdInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { limit, clinicId } = parsedInput;
		const { labId } = ctx;

		try {
			const pricings = await (
				await tenantPrisma(labId)
			).casePricingPlan.findMany({
				where: {
					labId: labId,
					clinicId,
				},
				orderBy: {
					createdAt: "desc",
				},
				take: limit,
				include: {
					lab: true,
					clinic: true,
				},
			});

			return {
				pricings: pricingPlansNormalizer(pricings),
			};
		} catch (e) {
			if (e instanceof APIError || e instanceof Error) {
				console.error("[Get-PricingPlans-By-ClinicId-Action] Error", e.message);
			}
			throw e;
		}
	});

function pricingPlansNormalizer(pricingPlan: CasePricingPlanModel[] | CasePricingPlanModel): CasePricingPlanDetailsUI[] | CasePricingPlanDetailsUI {
	if (Array.isArray(pricingPlan)) {
		return pricingPlan.map((p) => ({
			...p,
			additionalToothPrice: p.additionalToothPrice === null ? null : Number(p.additionalToothPrice),
			bulkPrice: p.bulkPrice === null ? null : Number(p.bulkPrice),
			firstToothPrice: p.firstToothPrice === null ? null : Number(p.firstToothPrice),
			teethCountToApplyBulkPrice: p.teethCountToApplyBulkPrice === null ? null : Number(p.teethCountToApplyBulkPrice),
			toothPrice: p.toothPrice === null ? null : Number(p.toothPrice),
		}));
	} else {
		return {
			...pricingPlan,
			additionalToothPrice: pricingPlan.additionalToothPrice === null ? null : Number(pricingPlan.additionalToothPrice),
			bulkPrice: pricingPlan.bulkPrice === null ? null : Number(pricingPlan.bulkPrice),
			firstToothPrice: pricingPlan.firstToothPrice === null ? null : Number(pricingPlan.firstToothPrice),
			teethCountToApplyBulkPrice: pricingPlan.teethCountToApplyBulkPrice === null ? null : Number(pricingPlan.teethCountToApplyBulkPrice),
			toothPrice: pricingPlan.toothPrice === null ? null : Number(pricingPlan.toothPrice),
		};
	}
}
