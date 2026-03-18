import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional(),
  pricingStrategy: SortOrderSchema.optional(),
  firstToothPrice: SortOrderSchema.optional(),
  bulkPrice: SortOrderSchema.optional(),
  additionalToothPrice: SortOrderSchema.optional(),
  bulkPriceThreshold: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const CasePricingPlanMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.CasePricingPlanMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CasePricingPlanMinOrderByAggregateInput>;
export const CasePricingPlanMinOrderByAggregateInputObjectZodSchema = makeSchema();
