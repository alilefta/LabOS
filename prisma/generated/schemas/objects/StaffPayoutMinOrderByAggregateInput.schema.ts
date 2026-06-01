import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  payoutNumber: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional(),
  staffId: SortOrderSchema.optional(),
  amount: SortOrderSchema.optional(),
  method: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  reference: SortOrderSchema.optional(),
  notes: SortOrderSchema.optional(),
  paidAt: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const StaffPayoutMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.StaffPayoutMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffPayoutMinOrderByAggregateInput>;
export const StaffPayoutMinOrderByAggregateInputObjectZodSchema = makeSchema();
