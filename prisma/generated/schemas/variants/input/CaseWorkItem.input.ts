import * as z from 'zod';
import { PricingStrategySchema } from '../../enums/PricingStrategy.schema';
import { JawTypeSchema } from '../../enums/JawType.schema';
// prettier-ignore
export const CaseWorkItemInputSchema = z.object({
    id: z.string(),
    productId: z.string().optional().nullable(),
    product: z.unknown().optional().nullable(),
    labId: z.string(),
    lab: z.unknown(),
    dentalCaseId: z.string(),
    dentalCase: z.unknown(),
    casePricingPlanId: z.string(),
    casePricingPlan: z.unknown(),
    totalPrice: z.number(),
    pricingStrategy: PricingStrategySchema,
    firstToothPrice: z.number().optional().nullable(),
    additionalToothPrice: z.number().optional().nullable(),
    teethCountToApplyBulkPrice: z.number().optional().nullable(),
    bulkPrice: z.number().optional().nullable(),
    toothPrice: z.number().optional().nullable(),
    jawType: JawTypeSchema,
    workTypeId: z.string().optional().nullable(),
    workType: z.unknown().optional().nullable(),
    notes: z.string().optional().nullable(),
    shadeSystem: z.string().optional().nullable(),
    baseShade: z.string().optional().nullable(),
    stumpShade: z.string().optional().nullable(),
    shadeNotes: z.string().optional().nullable(),
    selectedTeeth: z.array(z.unknown()),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type CaseWorkItemInputType = z.infer<typeof CaseWorkItemInputSchema>;
