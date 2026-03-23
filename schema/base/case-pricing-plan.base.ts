import * as z from "zod";
import { PricingStrategySchema } from "./pricing-strategy.base";
export const CasePricingPlanBaseSchema = z.object({
	id: z.string(),
	labId: z.string(),
	pricingStrategy: PricingStrategySchema,
	firstToothPrice: z.number().nullable(),
	bulkPrice: z.number().nullable(),
	additionalToothPrice: z.number().nullable(),
	bulkPriceThreshold: z.number().nullable(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export type CasePricingPlanBase = z.infer<typeof CasePricingPlanBaseSchema>;
