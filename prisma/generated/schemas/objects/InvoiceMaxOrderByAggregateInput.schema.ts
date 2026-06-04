import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional(),
  clinicId: SortOrderSchema.optional(),
  invoiceNumber: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  notes: SortOrderSchema.optional(),
  subtotal: SortOrderSchema.optional(),
  discountAmount: SortOrderSchema.optional(),
  appliedDiscountPercentage: SortOrderSchema.optional(),
  discountReason: SortOrderSchema.optional(),
  total: SortOrderSchema.optional(),
  amountPaid: SortOrderSchema.optional(),
  amountDue: SortOrderSchema.optional(),
  issuedAt: SortOrderSchema.optional(),
  dueDate: SortOrderSchema.optional(),
  publicToken: SortOrderSchema.optional(),
  publicLinkExpiresAt: SortOrderSchema.optional(),
  isActive: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const InvoiceMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.InvoiceMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.InvoiceMaxOrderByAggregateInput>;
export const InvoiceMaxOrderByAggregateInputObjectZodSchema = makeSchema();
