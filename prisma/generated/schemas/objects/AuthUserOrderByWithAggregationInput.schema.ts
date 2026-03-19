import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { AuthUserCountOrderByAggregateInputObjectSchema as AuthUserCountOrderByAggregateInputObjectSchema } from './AuthUserCountOrderByAggregateInput.schema';
import { AuthUserMaxOrderByAggregateInputObjectSchema as AuthUserMaxOrderByAggregateInputObjectSchema } from './AuthUserMaxOrderByAggregateInput.schema';
import { AuthUserMinOrderByAggregateInputObjectSchema as AuthUserMinOrderByAggregateInputObjectSchema } from './AuthUserMinOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  email: SortOrderSchema.optional(),
  emailVerified: SortOrderSchema.optional(),
  image: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  role: SortOrderSchema.optional(),
  _count: z.lazy(() => AuthUserCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => AuthUserMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => AuthUserMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const AuthUserOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.AuthUserOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.AuthUserOrderByWithAggregationInput>;
export const AuthUserOrderByWithAggregationInputObjectZodSchema = makeSchema();
