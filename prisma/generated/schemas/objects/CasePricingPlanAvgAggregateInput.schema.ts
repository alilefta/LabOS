import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  firstToothPrice: z.literal(true).optional(),
  additionalToothPrice: z.literal(true).optional(),
  TeethCountToApplyBulkPrice: z.literal(true).optional(),
  bulkPrice: z.literal(true).optional(),
  toothPrice: z.literal(true).optional()
}).strict();
export const CasePricingPlanAvgAggregateInputObjectSchema: z.ZodType<Prisma.CasePricingPlanAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.CasePricingPlanAvgAggregateInputType>;
export const CasePricingPlanAvgAggregateInputObjectZodSchema = makeSchema();
