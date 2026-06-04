import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { CaseWorkItemAddonCountOrderByAggregateInputObjectSchema as CaseWorkItemAddonCountOrderByAggregateInputObjectSchema } from './CaseWorkItemAddonCountOrderByAggregateInput.schema';
import { CaseWorkItemAddonAvgOrderByAggregateInputObjectSchema as CaseWorkItemAddonAvgOrderByAggregateInputObjectSchema } from './CaseWorkItemAddonAvgOrderByAggregateInput.schema';
import { CaseWorkItemAddonMaxOrderByAggregateInputObjectSchema as CaseWorkItemAddonMaxOrderByAggregateInputObjectSchema } from './CaseWorkItemAddonMaxOrderByAggregateInput.schema';
import { CaseWorkItemAddonMinOrderByAggregateInputObjectSchema as CaseWorkItemAddonMinOrderByAggregateInputObjectSchema } from './CaseWorkItemAddonMinOrderByAggregateInput.schema';
import { CaseWorkItemAddonSumOrderByAggregateInputObjectSchema as CaseWorkItemAddonSumOrderByAggregateInputObjectSchema } from './CaseWorkItemAddonSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  caseWorkItemId: SortOrderSchema.optional(),
  addonId: SortOrderSchema.optional(),
  priceSnapshot: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  _count: z.lazy(() => CaseWorkItemAddonCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => CaseWorkItemAddonAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => CaseWorkItemAddonMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => CaseWorkItemAddonMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => CaseWorkItemAddonSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const CaseWorkItemAddonOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.CaseWorkItemAddonOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemAddonOrderByWithAggregationInput>;
export const CaseWorkItemAddonOrderByWithAggregationInputObjectZodSchema = makeSchema();
