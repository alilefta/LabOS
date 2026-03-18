import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  firstName: SortOrderSchema.optional(),
  lastName: SortOrderSchema.optional(),
  city: SortOrderSchema.optional(),
  zipcode: SortOrderSchema.optional(),
  address1: SortOrderSchema.optional(),
  address2: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional(),
  email: SortOrderSchema.optional(),
  phoneNumber: SortOrderSchema.optional(),
  avatarUrl: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const SalesRepresentativeMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.SalesRepresentativeMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.SalesRepresentativeMinOrderByAggregateInput>;
export const SalesRepresentativeMinOrderByAggregateInputObjectZodSchema = makeSchema();
