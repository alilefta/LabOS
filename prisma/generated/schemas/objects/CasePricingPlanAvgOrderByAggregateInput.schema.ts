import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  firstToothPrice: SortOrderSchema.optional(),
  bulkPrice: SortOrderSchema.optional(),
  additionalToothPrice: SortOrderSchema.optional(),
  bulkPriceThreshold: SortOrderSchema.optional()
}).strict();
export const CasePricingPlanAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.CasePricingPlanAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CasePricingPlanAvgOrderByAggregateInput>;
export const CasePricingPlanAvgOrderByAggregateInputObjectZodSchema = makeSchema();
