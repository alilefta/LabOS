"use server";

import { ERRORS } from "@/lib/errors";
import { normalizePricingPlan } from "@/lib/mappers";
import { tenantPrisma } from "@/lib/prisma";
import { actionClientWithLab } from "@/lib/safe-action";
import { APIError } from "better-auth";
import { z } from "zod";

export const getPricingPlanByIdAction = actionClientWithLab
	.metadata({
		actionName: "Get-Pricing-Plan-By-Id-Action",
		requiredLabRole: "STAFF",
	})
	.inputSchema(
		z.object({
			planId: z.uuid(),
		}),
	)
	.action(async ({ ctx, parsedInput }) => {
		const { labId } = ctx;
		const { planId } = parsedInput;
		try {
			const prisma = await tenantPrisma(labId);

			const plan = await prisma.casePricingPlan.findUnique({
				where: { id: planId, labId },
			});

			if (!plan) throw ERRORS.NOT_FOUND;

			return { plan: normalizePricingPlan(plan) };
		} catch (e) {
			if (e instanceof APIError || e instanceof Error) {
				console.error("[Get-Pricing-Plan-By-Id-Action] Error", e.message);
			}
			throw e;
		}
	});
