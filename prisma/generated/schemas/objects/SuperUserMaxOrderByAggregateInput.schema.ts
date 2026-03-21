import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  city: SortOrderSchema.optional(),
  zipcode: SortOrderSchema.optional(),
  address1: SortOrderSchema.optional(),
  address2: SortOrderSchema.optional(),
  avatarUrl: SortOrderSchema.optional(),
  secondaryEmail: SortOrderSchema.optional(),
  phoneNumber: SortOrderSchema.optional(),
  role: SortOrderSchema.optional(),
  authUserId: SortOrderSchema.optional(),
  isActive: SortOrderSchema.optional(),
  lastTimeActive: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const SuperUserMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.SuperUserMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.SuperUserMaxOrderByAggregateInput>;
export const SuperUserMaxOrderByAggregateInputObjectZodSchema = makeSchema();
