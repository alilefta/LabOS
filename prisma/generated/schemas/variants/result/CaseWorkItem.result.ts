import * as z from 'zod';
import { PricingStrategySchema } from '../../enums/PricingStrategy.schema';
import { JawTypeSchema } from '../../enums/JawType.schema';
// prettier-ignore
export const CaseWorkItemResultSchema = z.object({
    id: z.string(),
    productId: z.string().nullable(),
    product: z.unknown().nullable(),
    labId: z.string(),
    Lab: z.unknown(),
    dentalCaseId: z.string(),
    dentalCase: z.unknown(),
    casePricingPlanId: z.string(),
    casePricingPlan: z.unknown(),
    totalPrice: z.number(),
    pricingStrategy: PricingStrategySchema,
    firstToothPrice: z.number().nullable(),
    bulkPrice: z.number().nullable(),
    additionalToothPrice: z.number().nullable(),
    bulkPriceThreshold: z.number().nullable(),
    jawType: JawTypeSchema,
    selectedTeeth: z.array(z.unknown()),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type CaseWorkItemResultType = z.infer<typeof CaseWorkItemResultSchema>;
