import * as z from 'zod';
import { PricingStrategySchema } from '../../enums/PricingStrategy.schema';
import { JawTypeSchema } from '../../enums/JawType.schema';
// prettier-ignore
export const CaseWorkItemInputSchema = z.object({
    id: z.string(),
    productId: z.string().optional().nullable(),
    product: z.unknown().optional().nullable(),
    labId: z.string(),
    Lab: z.unknown(),
    dentalCaseId: z.string(),
    dentalCase: z.unknown(),
    casePricingPlanId: z.string(),
    casePricingPlan: z.unknown(),
    totalPrice: z.number(),
    pricingStrategy: PricingStrategySchema,
    firstToothPrice: z.number().optional().nullable(),
    bulkPrice: z.number().optional().nullable(),
    additionalToothPrice: z.number().optional().nullable(),
    bulkPriceThreshold: z.number().optional().nullable(),
    jawType: JawTypeSchema,
    selectedTeeth: z.array(z.unknown()),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type CaseWorkItemInputType = z.infer<typeof CaseWorkItemInputSchema>;
