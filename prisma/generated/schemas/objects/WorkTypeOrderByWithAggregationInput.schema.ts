import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { WorkTypeCountOrderByAggregateInputObjectSchema as WorkTypeCountOrderByAggregateInputObjectSchema } from './WorkTypeCountOrderByAggregateInput.schema';
import { WorkTypeMaxOrderByAggregateInputObjectSchema as WorkTypeMaxOrderByAggregateInputObjectSchema } from './WorkTypeMaxOrderByAggregateInput.schema';
import { WorkTypeMinOrderByAggregateInputObjectSchema as WorkTypeMinOrderByAggregateInputObjectSchema } from './WorkTypeMinOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  description: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  imageUrl: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  labId: SortOrderSchema.optional(),
  caseCategoryId: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => WorkTypeCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => WorkTypeMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => WorkTypeMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const WorkTypeOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.WorkTypeOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.WorkTypeOrderByWithAggregationInput>;
export const WorkTypeOrderByWithAggregationInputObjectZodSchema = makeSchema();
