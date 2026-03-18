import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { SalesRepresentativeCountOrderByAggregateInputObjectSchema as SalesRepresentativeCountOrderByAggregateInputObjectSchema } from './SalesRepresentativeCountOrderByAggregateInput.schema';
import { SalesRepresentativeMaxOrderByAggregateInputObjectSchema as SalesRepresentativeMaxOrderByAggregateInputObjectSchema } from './SalesRepresentativeMaxOrderByAggregateInput.schema';
import { SalesRepresentativeMinOrderByAggregateInputObjectSchema as SalesRepresentativeMinOrderByAggregateInputObjectSchema } from './SalesRepresentativeMinOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  firstName: SortOrderSchema.optional(),
  lastName: SortOrderSchema.optional(),
  city: SortOrderSchema.optional(),
  zipcode: SortOrderSchema.optional(),
  address1: SortOrderSchema.optional(),
  address2: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  labId: SortOrderSchema.optional(),
  email: SortOrderSchema.optional(),
  phoneNumber: SortOrderSchema.optional(),
  avatarUrl: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => SalesRepresentativeCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => SalesRepresentativeMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => SalesRepresentativeMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const SalesRepresentativeOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.SalesRepresentativeOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.SalesRepresentativeOrderByWithAggregationInput>;
export const SalesRepresentativeOrderByWithAggregationInputObjectZodSchema = makeSchema();
