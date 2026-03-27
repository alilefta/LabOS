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
  bulkPrice: SortOrderSchema.optional(),
  additionalToothPrice: SortOrderSchema.optional(),
  bulkPriceThreshold: SortOrderSchema.optional(),
  productId: SortOrderSchema.optional(),
  clinicId: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const CasePricingPlanCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.CasePricingPlanCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CasePricingPlanCountOrderByAggregateInput>;
export const CasePricingPlanCountOrderByAggregateInputObjectZodSchema = makeSchema();
