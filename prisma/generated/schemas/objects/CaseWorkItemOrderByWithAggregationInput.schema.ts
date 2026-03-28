import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { CaseWorkItemCountOrderByAggregateInputObjectSchema as CaseWorkItemCountOrderByAggregateInputObjectSchema } from './CaseWorkItemCountOrderByAggregateInput.schema';
import { CaseWorkItemAvgOrderByAggregateInputObjectSchema as CaseWorkItemAvgOrderByAggregateInputObjectSchema } from './CaseWorkItemAvgOrderByAggregateInput.schema';
import { CaseWorkItemMaxOrderByAggregateInputObjectSchema as CaseWorkItemMaxOrderByAggregateInputObjectSchema } from './CaseWorkItemMaxOrderByAggregateInput.schema';
import { CaseWorkItemMinOrderByAggregateInputObjectSchema as CaseWorkItemMinOrderByAggregateInputObjectSchema } from './CaseWorkItemMinOrderByAggregateInput.schema';
import { CaseWorkItemSumOrderByAggregateInputObjectSchema as CaseWorkItemSumOrderByAggregateInputObjectSchema } from './CaseWorkItemSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  productId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  labId: SortOrderSchema.optional(),
  dentalCaseId: SortOrderSchema.optional(),
  casePricingPlanId: SortOrderSchema.optional(),
  totalPrice: SortOrderSchema.optional(),
  pricingStrategy: SortOrderSchema.optional(),
  firstToothPrice: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  bulkPrice: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  additionalToothPrice: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  bulkPriceThreshold: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  jawType: SortOrderSchema.optional(),
  workTypeId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => CaseWorkItemCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => CaseWorkItemAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => CaseWorkItemMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => CaseWorkItemMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => CaseWorkItemSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const CaseWorkItemOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.CaseWorkItemOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemOrderByWithAggregationInput>;
export const CaseWorkItemOrderByWithAggregationInputObjectZodSchema = makeSchema();
