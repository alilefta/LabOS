import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { LabCountOrderByAggregateInputObjectSchema as LabCountOrderByAggregateInputObjectSchema } from './LabCountOrderByAggregateInput.schema';
import { LabAvgOrderByAggregateInputObjectSchema as LabAvgOrderByAggregateInputObjectSchema } from './LabAvgOrderByAggregateInput.schema';
import { LabMaxOrderByAggregateInputObjectSchema as LabMaxOrderByAggregateInputObjectSchema } from './LabMaxOrderByAggregateInput.schema';
import { LabMinOrderByAggregateInputObjectSchema as LabMinOrderByAggregateInputObjectSchema } from './LabMinOrderByAggregateInput.schema';
import { LabSumOrderByAggregateInputObjectSchema as LabSumOrderByAggregateInputObjectSchema } from './LabSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  title: SortOrderSchema.optional(),
  slug: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  brandAvatarUrl: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  subtitle: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  nextCaseNumber: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => LabCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => LabAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => LabMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => LabMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => LabSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const LabOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.LabOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.LabOrderByWithAggregationInput>;
export const LabOrderByWithAggregationInputObjectZodSchema = makeSchema();
