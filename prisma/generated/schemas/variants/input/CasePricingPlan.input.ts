import * as z from 'zod';
import { PricingStrategySchema } from '../../enums/PricingStrategy.schema';
// prettier-ignore
export const CasePricingPlanInputSchema = z.object({
    id: z.string(),
    labId: z.string(),
    Lab: z.unknown(),
    pricingStrategy: PricingStrategySchema,
    firstToothPrice: z.number().optional().nullable(),
    bulkPrice: z.number().optional().nullable(),
    additionalToothPrice: z.number().optional().nullable(),
    bulkPriceThreshold: z.number().optional().nullable(),
    caseWorkItem: z.array(z.unknown()),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type CasePricingPlanInputType = z.infer<typeof CasePricingPlanInputSchema>;
