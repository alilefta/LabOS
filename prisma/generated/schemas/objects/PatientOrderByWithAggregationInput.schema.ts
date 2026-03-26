import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { PatientCountOrderByAggregateInputObjectSchema as PatientCountOrderByAggregateInputObjectSchema } from './PatientCountOrderByAggregateInput.schema';
import { PatientMaxOrderByAggregateInputObjectSchema as PatientMaxOrderByAggregateInputObjectSchema } from './PatientMaxOrderByAggregateInput.schema';
import { PatientMinOrderByAggregateInputObjectSchema as PatientMinOrderByAggregateInputObjectSchema } from './PatientMinOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  description: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  city: SortOrderSchema.optional(),
  zipcode: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  address1: SortOrderSchema.optional(),
  address2: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  email: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  phoneNumber: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  labId: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => PatientCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => PatientMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => PatientMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const PatientOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.PatientOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.PatientOrderByWithAggregationInput>;
export const PatientOrderByWithAggregationInputObjectZodSchema = makeSchema();
