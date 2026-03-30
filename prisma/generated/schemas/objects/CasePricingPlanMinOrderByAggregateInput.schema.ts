import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  isDefault: SortOrderSchema.optional(),
  pricingStrategy: SortOrderSchema.optional(),
  firstToothPrice: SortOrderSchema.optional(),
  additionalToothPrice: SortOrderSchema.optional(),
  TeethCountToApplyBulkPrice: SortOrderSchema.optional(),
  bulkPrice: SortOrderSchema.optional(),
  toothPrice: SortOrderSchema.optional(),
  productId: SortOrderSchema.optional(),
  clinicId: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const CasePricingPlanMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.CasePricingPlanMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CasePricingPlanMinOrderByAggregateInput>;
export const CasePricingPlanMinOrderByAggregateInputObjectZodSchema = makeSchema();
