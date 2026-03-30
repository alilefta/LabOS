import * as z from 'zod';
import { PricingStrategySchema } from '../../enums/PricingStrategy.schema';
// prettier-ignore
export const CasePricingPlanModelSchema = z.object({
    id: z.string(),
    labId: z.string(),
    lab: z.unknown(),
    name: z.string(),
    isDefault: z.boolean(),
    pricingStrategy: PricingStrategySchema,
    firstToothPrice: z.number().nullable(),
    additionalToothPrice: z.number().nullable(),
    TeethCountToApplyBulkPrice: z.number().nullable(),
    bulkPrice: z.number().nullable(),
    toothPrice: z.number().nullable(),
    productId: z.string().nullable(),
    product: z.unknown().nullable(),
    clinicId: z.string().nullable(),
    clinic: z.unknown().nullable(),
    caseWorkItem: z.array(z.unknown()),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type CasePricingPlanPureType = z.infer<typeof CasePricingPlanModelSchema>;
