import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  description: SortOrderSchema.optional(),
  website: SortOrderSchema.optional(),
  notes: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  type: SortOrderSchema.optional(),
  city: SortOrderSchema.optional(),
  zipcode: SortOrderSchema.optional(),
  address1: SortOrderSchema.optional(),
  address2: SortOrderSchema.optional(),
  email: SortOrderSchema.optional(),
  phoneNumber: SortOrderSchema.optional(),
  billingEmail: SortOrderSchema.optional(),
  billingPhoneNumber: SortOrderSchema.optional(),
  taxNumber: SortOrderSchema.optional(),
  discount: SortOrderSchema.optional(),
  creditLimit: SortOrderSchema.optional(),
  currentBalance: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const ClinicMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ClinicMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ClinicMinOrderByAggregateInput>;
export const ClinicMinOrderByAggregateInputObjectZodSchema = makeSchema();
