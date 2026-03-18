import * as z from 'zod';
import { PricingStrategySchema } from '../../enums/PricingStrategy.schema';
// prettier-ignore
export const CasePricingPlanModelSchema = z.object({
    id: z.string(),
    labId: z.string(),
    Lab: z.unknown(),
    pricingStrategy: PricingStrategySchema,
    firstToothPrice: z.number().nullable(),
    bulkPrice: z.number().nullable(),
    additionalToothPrice: z.number().nullable(),
    bulkPriceThreshold: z.number().nullable(),
    caseWorkItem: z.array(z.unknown()),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type CasePricingPlanPureType = z.infer<typeof CasePricingPlanModelSchema>;
