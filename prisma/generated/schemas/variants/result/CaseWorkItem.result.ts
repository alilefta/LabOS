import * as z from 'zod';
import { PricingStrategySchema } from '../../enums/PricingStrategy.schema';
import { JawTypeSchema } from '../../enums/JawType.schema';
// prettier-ignore
export const CaseWorkItemResultSchema = z.object({
    id: z.string(),
    productId: z.string().nullable(),
    product: z.unknown().nullable(),
    labId: z.string(),
    lab: z.unknown(),
    dentalCaseId: z.string(),
    dentalCase: z.unknown(),
    casePricingPlanId: z.string(),
    casePricingPlan: z.unknown(),
    totalPrice: z.number(),
    pricingStrategy: PricingStrategySchema,
    firstToothPrice: z.number().nullable(),
    additionalToothPrice: z.number().nullable(),
    teethCountToApplyBulkPrice: z.number().nullable(),
    bulkPrice: z.number().nullable(),
    toothPrice: z.number().nullable(),
    jawType: JawTypeSchema,
    workTypeId: z.string().nullable(),
    workType: z.unknown().nullable(),
    notes: z.string().nullable(),
    shadeSystem: z.string().nullable(),
    baseShade: z.string().nullable(),
    stumpShade: z.string().nullable(),
    shadeNotes: z.string().nullable(),
    selectedTeeth: z.array(z.unknown()),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type CaseWorkItemResultType = z.infer<typeof CaseWorkItemResultSchema>;
