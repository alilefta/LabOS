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
  email: SortOrderSchema.optional(),
  phoneNumber: SortOrderSchema.optional(),
  role: SortOrderSchema.optional(),
  authUserId: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional(),
  isActive: SortOrderSchema.optional(),
  lastTimeActive: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const LabUserMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.LabUserMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUserMinOrderByAggregateInput>;
export const LabUserMinOrderByAggregateInputObjectZodSchema = makeSchema();
