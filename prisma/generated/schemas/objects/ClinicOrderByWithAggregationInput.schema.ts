import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { ClinicCountOrderByAggregateInputObjectSchema as ClinicCountOrderByAggregateInputObjectSchema } from './ClinicCountOrderByAggregateInput.schema';
import { ClinicAvgOrderByAggregateInputObjectSchema as ClinicAvgOrderByAggregateInputObjectSchema } from './ClinicAvgOrderByAggregateInput.schema';
import { ClinicMaxOrderByAggregateInputObjectSchema as ClinicMaxOrderByAggregateInputObjectSchema } from './ClinicMaxOrderByAggregateInput.schema';
import { ClinicMinOrderByAggregateInputObjectSchema as ClinicMinOrderByAggregateInputObjectSchema } from './ClinicMinOrderByAggregateInput.schema';
import { ClinicSumOrderByAggregateInputObjectSchema as ClinicSumOrderByAggregateInputObjectSchema } from './ClinicSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  description: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  website: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  notes: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  status: SortOrderSchema.optional(),
  type: SortOrderSchema.optional(),
  city: SortOrderSchema.optional(),
  zipcode: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  address1: SortOrderSchema.optional(),
  address2: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  email: SortOrderSchema.optional(),
  phoneNumber: SortOrderSchema.optional(),
  billingEmail: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  billingPhoneNumber: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  taxNumber: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  discount: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  creditLimit: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  currentBalance: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => ClinicCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => ClinicAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => ClinicMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => ClinicMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => ClinicSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const ClinicOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.ClinicOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.ClinicOrderByWithAggregationInput>;
export const ClinicOrderByWithAggregationInputObjectZodSchema = makeSchema();
