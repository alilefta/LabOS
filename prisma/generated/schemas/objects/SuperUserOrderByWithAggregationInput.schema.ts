import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { SuperUserCountOrderByAggregateInputObjectSchema as SuperUserCountOrderByAggregateInputObjectSchema } from './SuperUserCountOrderByAggregateInput.schema';
import { SuperUserMaxOrderByAggregateInputObjectSchema as SuperUserMaxOrderByAggregateInputObjectSchema } from './SuperUserMaxOrderByAggregateInput.schema';
import { SuperUserMinOrderByAggregateInputObjectSchema as SuperUserMinOrderByAggregateInputObjectSchema } from './SuperUserMinOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  city: SortOrderSchema.optional(),
  zipcode: SortOrderSchema.optional(),
  address1: SortOrderSchema.optional(),
  address2: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  avatarUrl: SortOrderSchema.optional(),
  email: SortOrderSchema.optional(),
  phoneNumber: SortOrderSchema.optional(),
  role: SortOrderSchema.optional(),
  isActive: SortOrderSchema.optional(),
  lastTimeActive: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => SuperUserCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => SuperUserMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => SuperUserMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const SuperUserOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.SuperUserOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.SuperUserOrderByWithAggregationInput>;
export const SuperUserOrderByWithAggregationInputObjectZodSchema = makeSchema();
