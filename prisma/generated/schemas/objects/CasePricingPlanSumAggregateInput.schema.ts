import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  firstToothPrice: z.literal(true).optional(),
  bulkPrice: z.literal(true).optional(),
  additionalToothPrice: z.literal(true).optional(),
  bulkPriceThreshold: z.literal(true).optional()
}).strict();
export const CasePricingPlanSumAggregateInputObjectSchema: z.ZodType<Prisma.CasePricingPlanSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.CasePricingPlanSumAggregateInputType>;
export const CasePricingPlanSumAggregateInputObjectZodSchema = makeSchema();
