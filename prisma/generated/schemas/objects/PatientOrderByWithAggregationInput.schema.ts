import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { PatientCountOrderByAggregateInputObjectSchema as PatientCountOrderByAggregateInputObjectSchema } from './PatientCountOrderByAggregateInput.schema';
import { PatientAvgOrderByAggregateInputObjectSchema as PatientAvgOrderByAggregateInputObjectSchema } from './PatientAvgOrderByAggregateInput.schema';
import { PatientMaxOrderByAggregateInputObjectSchema as PatientMaxOrderByAggregateInputObjectSchema } from './PatientMaxOrderByAggregateInput.schema';
import { PatientMinOrderByAggregateInputObjectSchema as PatientMinOrderByAggregateInputObjectSchema } from './PatientMinOrderByAggregateInput.schema';
import { PatientSumOrderByAggregateInputObjectSchema as PatientSumOrderByAggregateInputObjectSchema } from './PatientSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  description: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  notes: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  age: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  gender: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  labId: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => PatientCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => PatientAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => PatientMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => PatientMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => PatientSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const PatientOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.PatientOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.PatientOrderByWithAggregationInput>;
export const PatientOrderByWithAggregationInputObjectZodSchema = makeSchema();
