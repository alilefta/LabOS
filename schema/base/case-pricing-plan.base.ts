import * as z from "zod";
import { PricingStrategySchema } from "./enums.base";

export const CasePricingPlanBaseSchema = z.object({
	id: z.string(),
	labId: z.string(),
	name: z.string(),
	isDefault: z.boolean(),
	pricingStrategy: PricingStrategySchema,
	firstToothPrice: z.number().nullable(),
	bulkPrice: z.number().nullable(),
	additionalToothPrice: z.number().nullable(),
	bulkPriceThreshold: z.number().nullable(),
	productId: z.string().nullable(),
	clinicId: z.string().nullable(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export type CasePricingPlanBase = z.infer<typeof CasePricingPlanBaseSchema>;
