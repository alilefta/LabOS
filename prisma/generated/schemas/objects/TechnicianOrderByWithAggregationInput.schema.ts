import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { TechnicianCountOrderByAggregateInputObjectSchema as TechnicianCountOrderByAggregateInputObjectSchema } from './TechnicianCountOrderByAggregateInput.schema';
import { TechnicianMaxOrderByAggregateInputObjectSchema as TechnicianMaxOrderByAggregateInputObjectSchema } from './TechnicianMaxOrderByAggregateInput.schema';
import { TechnicianMinOrderByAggregateInputObjectSchema as TechnicianMinOrderByAggregateInputObjectSchema } from './TechnicianMinOrderByAggregateInput.schema'

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
  _count: z.lazy(() => TechnicianCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => TechnicianMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => TechnicianMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const TechnicianOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.TechnicianOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.TechnicianOrderByWithAggregationInput>;
export const TechnicianOrderByWithAggregationInputObjectZodSchema = makeSchema();
