import * as z from 'zod';
export const InvoicePaymentUpdateResultSchema = z.nullable(z.object({
  id: z.string(),
  invoiceId: z.string(),
  invoice: z.unknown(),
  labId: z.string(),
  lab: z.unknown(),
  amount: z.number(),
  method: z.unknown(),
  reference: z.string().optional(),
  notes: z.string().optional(),
  paidAt: z.date(),
  createdAt: z.date()
}));