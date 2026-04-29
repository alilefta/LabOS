import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  invoiceId: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional(),
  amount: SortOrderSchema.optional(),
  method: SortOrderSchema.optional(),
  reference: SortOrderSchema.optional(),
  notes: SortOrderSchema.optional(),
  paidAt: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional()
}).strict();
export const InvoicePaymentCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.InvoicePaymentCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.InvoicePaymentCountOrderByAggregateInput>;
export const InvoicePaymentCountOrderByAggregateInputObjectZodSchema = makeSchema();
