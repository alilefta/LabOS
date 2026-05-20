"use server";

import { ERRORS } from "@/lib/errors";
import { tenantPrisma } from "@/lib/prisma";
import { actionClientWithLab } from "@/lib/safe-action";
import { PricingStrategy } from "@/schema/base/enums.base";
import { ClinicPricingPlanDTO } from "@/schema/composed/clinics/clinic-pricings";
import { APIError } from "better-auth";
import z from "zod";

export const getClinicPricingPlansAction = actionClientWithLab
	.metadata({
		actionName: "Get-Clinic-Details-Action",
		requiredLabRole: "STAFF",
	})
	.inputSchema(z.object({ clinicId: z.string().min(1) }))
	.action(async ({ ctx, parsedInput }) => {
		const { labId } = ctx;
		const { clinicId } = parsedInput;
		try {
			const prisma = await tenantPrisma(labId);

			const clinic = await prisma.clinic.findUnique({
				where: { id: clinicId, labId },
				select: { id: true },
			});
			if (!clinic) throw ERRORS.CLIENT_NOT_FOUND;

			// ── Fetch clinic-specific plans ───────────────────────────────────────────
			const clinicPlans = await prisma.casePricingPlan.findMany({
				where: { clinicId, labId },
				orderBy: { createdAt: "asc" },
				select: {
					id: true,
					name: true,
					pricingStrategy: true,
					bulkPrice: true,
					toothPrice: true,
					firstToothPrice: true,
					additionalToothPrice: true,
					teethCountToApplyBulkPrice: true,
					productId: true,
					product: {
						select: {
							name: true,
							workType: { select: { name: true } },
						},
					},
				},
			});

			if (clinicPlans.length === 0) return { plans: [] };

			// ── Fetch lab default plans for same products ─────────────────────────────
			const productIds = clinicPlans.map((p) => p.productId).filter((id): id is string => id !== null);

			const defaultPlans =
				productIds.length > 0
					? await prisma.casePricingPlan.findMany({
							where: {
								labId,
								clinicId: null,
								isDefault: true,
								productId: { in: productIds },
							},
							select: {
								productId: true,
								pricingStrategy: true,
								bulkPrice: true,
								toothPrice: true,
								firstToothPrice: true,
							},
						})
					: [];

			// Map productId → default plan for O(1) lookup
			const defaultPlanMap = new Map(defaultPlans.map((p) => [p.productId, p]));

			// ── Resolve representative price from a plan ──────────────────────────────
			// Each pricing strategy exposes a different "headline" price for comparison.
			function resolveHeadlinePrice(plan: { pricingStrategy: PricingStrategy; bulkPrice: unknown; toothPrice: unknown; firstToothPrice: unknown }): number | null {
				switch (plan.pricingStrategy) {
					case "BULK":
						return plan.bulkPrice !== null ? Number(plan.bulkPrice) : null;
					case "PERTOOTH":
						return plan.toothPrice !== null ? Number(plan.toothPrice) : null;
					case "CUSTOM":
						return plan.firstToothPrice !== null ? Number(plan.firstToothPrice) : null;
				}
			}

			// ── Compose DTOs ──────────────────────────────────────────────────────────
			const plans: ClinicPricingPlanDTO[] = clinicPlans.map((p) => {
				const defaultPlan = p.productId ? (defaultPlanMap.get(p.productId) ?? null) : null;

				const clinicPrice = resolveHeadlinePrice(p);
				const standardPrice = defaultPlan ? resolveHeadlinePrice(defaultPlan) : null;

				const discountPercent = clinicPrice !== null && standardPrice !== null && standardPrice > 0 ? Math.round(((standardPrice - clinicPrice) / standardPrice) * 100 * 10) / 10 : null;

				return {
					id: p.id,
					name: p.name,
					pricingStrategy: p.pricingStrategy,
					productName: p.product?.name ?? null,
					workTypeName: p.product?.workType?.name ?? null,
					details: {
						bulkPrice: p.bulkPrice !== null ? Number(p.bulkPrice) : null,
						toothPrice: p.toothPrice !== null ? Number(p.toothPrice) : null,
						firstToothPrice: p.firstToothPrice !== null ? Number(p.firstToothPrice) : null,
						additionalToothPrice: p.additionalToothPrice !== null ? Number(p.additionalToothPrice) : null,
						teethCountToApplyBulkPrice: p.teethCountToApplyBulkPrice !== null ? Number(p.teethCountToApplyBulkPrice) : null,
					},
					standardComparison: standardPrice !== null ? { price: standardPrice, discountPercent } : null,
				};
			});

			return { plans };
		} catch (e) {
			if (e instanceof APIError || e instanceof Error) {
				console.error("[Get-Clinic-Details-Action] Error", e.message);
			}
			throw e;
		}
	});
