import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  email: SortOrderSchema.optional(),
  emailVerified: SortOrderSchema.optional(),
  image: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  role: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional()
}).strict();
export const AuthUserMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.AuthUserMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.AuthUserMaxOrderByAggregateInput>;
export const AuthUserMaxOrderByAggregateInputObjectZodSchema = makeSchema();
