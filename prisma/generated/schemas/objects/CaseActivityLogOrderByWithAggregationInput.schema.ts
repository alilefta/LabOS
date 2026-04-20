import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { CaseActivityLogCountOrderByAggregateInputObjectSchema as CaseActivityLogCountOrderByAggregateInputObjectSchema } from './CaseActivityLogCountOrderByAggregateInput.schema';
import { CaseActivityLogMaxOrderByAggregateInputObjectSchema as CaseActivityLogMaxOrderByAggregateInputObjectSchema } from './CaseActivityLogMaxOrderByAggregateInput.schema';
import { CaseActivityLogMinOrderByAggregateInputObjectSchema as CaseActivityLogMinOrderByAggregateInputObjectSchema } from './CaseActivityLogMinOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  caseId: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional(),
  actorId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  actorName: SortOrderSchema.optional(),
  type: SortOrderSchema.optional(),
  summary: SortOrderSchema.optional(),
  payload: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  _count: z.lazy(() => CaseActivityLogCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => CaseActivityLogMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => CaseActivityLogMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const CaseActivityLogOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.CaseActivityLogOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseActivityLogOrderByWithAggregationInput>;
export const CaseActivityLogOrderByWithAggregationInputObjectZodSchema = makeSchema();
