import * as z from 'zod';
export const InvoicePaymentFindManyResultSchema = z.object({
  data: z.array(z.object({
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
})),
  pagination: z.object({
  page: z.number().int().min(1),
  pageSize: z.number().int().min(1),
  total: z.number().int().min(0),
  totalPages: z.number().int().min(0),
  hasNext: z.boolean(),
  hasPrev: z.boolean()
})
});