"use server";

import { normalizePricingPlan } from "@/lib/mappers";
import { tenantPrisma } from "@/lib/prisma";
import { actionClientWithLab } from "@/lib/safe-action";
import { CreateCaseItemPricingPlanInputSchema } from "@/schema/composed/case-pricing-plan.details";
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
			});

			return {
				pricingPlan: normalizePricingPlan(pricingPlan),
			};
		} catch (e) {
			if (e instanceof APIError || e instanceof Error) {
				console.error("[Create-PricingPlan-Action] Error", e.message);
			}
			throw e;
		}
	});
