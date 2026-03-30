import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  firstToothPrice: SortOrderSchema.optional(),
  additionalToothPrice: SortOrderSchema.optional(),
  TeethCountToApplyBulkPrice: SortOrderSchema.optional(),
  bulkPrice: SortOrderSchema.optional(),
  toothPrice: SortOrderSchema.optional()
}).strict();
export const CasePricingPlanSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.CasePricingPlanSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CasePricingPlanSumOrderByAggregateInput>;
export const CasePricingPlanSumOrderByAggregateInputObjectZodSchema = makeSchema();
