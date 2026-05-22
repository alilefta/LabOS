"use server";

import { ERRORS } from "@/lib/errors";
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
			const prisma = await tenantPrisma(labId);

			// ── Ownership verification ────────────────────────────────────────────────
			const product = await prisma.product.findUnique({
				where: { id: productId, labId },
				select: { id: true },
			});
			if (!product) throw ERRORS.NOT_FOUND;

			if (clinicId) {
				const clinic = await prisma.clinic.findUnique({
					where: { id: clinicId, labId },
					select: { id: true },
				});
				if (!clinic) throw ERRORS.CLIENT_NOT_FOUND;
			}

			const pricingPlan = await prisma.casePricingPlan.create({
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
