import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  labId: z.literal(true).optional(),
  clinicId: z.literal(true).optional(),
  invoiceNumber: z.literal(true).optional(),
  status: z.literal(true).optional(),
  notes: z.literal(true).optional(),
  subtotal: z.literal(true).optional(),
  discountAmount: z.literal(true).optional(),
  appliedDiscountPercentage: z.literal(true).optional(),
  discountReason: z.literal(true).optional(),
  total: z.literal(true).optional(),
  amountPaid: z.literal(true).optional(),
  amountDue: z.literal(true).optional(),
  issuedAt: z.literal(true).optional(),
  dueDate: z.literal(true).optional(),
  publicToken: z.literal(true).optional(),
  publicLinkExpiresAt: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const InvoiceMinAggregateInputObjectSchema: z.ZodType<Prisma.InvoiceMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.InvoiceMinAggregateInputType>;
export const InvoiceMinAggregateInputObjectZodSchema = makeSchema();
