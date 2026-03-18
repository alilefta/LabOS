import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { ClinicCountOrderByAggregateInputObjectSchema as ClinicCountOrderByAggregateInputObjectSchema } from './ClinicCountOrderByAggregateInput.schema';
import { ClinicMaxOrderByAggregateInputObjectSchema as ClinicMaxOrderByAggregateInputObjectSchema } from './ClinicMaxOrderByAggregateInput.schema';
import { ClinicMinOrderByAggregateInputObjectSchema as ClinicMinOrderByAggregateInputObjectSchema } from './ClinicMinOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  description: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  city: SortOrderSchema.optional(),
  zipcode: SortOrderSchema.optional(),
  address1: SortOrderSchema.optional(),
  address2: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  email: SortOrderSchema.optional(),
  phoneNumber: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => ClinicCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => ClinicMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => ClinicMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const ClinicOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.ClinicOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.ClinicOrderByWithAggregationInput>;
export const ClinicOrderByWithAggregationInputObjectZodSchema = makeSchema();
