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
  notes: SortOrderSchema.optional(),
  shadeSystem: SortOrderSchema.optional(),
  baseShade: SortOrderSchema.optional(),
  stumpShade: SortOrderSchema.optional(),
  shadeNotes: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const CaseWorkItemCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.CaseWorkItemCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemCountOrderByAggregateInput>;
export const CaseWorkItemCountOrderByAggregateInputObjectZodSchema = makeSchema();
