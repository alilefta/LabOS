import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  productId: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional(),
  dentalCaseId: SortOrderSchema.optional(),
  casePricingPlanId: SortOrderSchema.optional(),
  totalPrice: SortOrderSchema.optional(),
  pricingStrategy: SortOrderSchema.optional(),
  firstToothPrice: SortOrderSchema.optional(),
  additionalToothPrice: SortOrderSchema.optional(),
  teethCountToApplyBulkPrice: SortOrderSchema.optional(),
  bulkPrice: SortOrderSchema.optional(),
  toothPrice: SortOrderSchema.optional(),
  jawType: SortOrderSchema.optional(),
  workTypeId: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const CaseWorkItemMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.CaseWorkItemMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemMinOrderByAggregateInput>;
export const CaseWorkItemMinOrderByAggregateInputObjectZodSchema = makeSchema();
