import { z } from "zod";

import { JawTypeSchema } from "./jaw-type.base";
import { PricingStrategySchema } from "./pricing-strategy.base";

export const CaseWorkItemBaseSchema = z.object({
	id: z.string(),
	productId: z.string().nullable(),
	labId: z.string(),
	caseId: z.string(),
	casePricingPlanId: z.string(),
	totalPrice: z.number(),
	pricingStrategy: PricingStrategySchema,
	firstToothPrice: z.number().nullable(),
	bulkPrice: z.number().nullable(),
	additionalToothPrice: z.number().nullable(),
	bulkPriceThreshold: z.number().nullable(),
	jawType: JawTypeSchema,
	createdAt: z.date(),
	updatedAt: z.date(),
});

export type CaseWorkItemBase = z.infer<typeof CaseWorkItemBaseSchema>;
