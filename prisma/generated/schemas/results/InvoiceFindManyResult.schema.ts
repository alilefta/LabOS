import * as z from 'zod';
export const InvoiceFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  labId: z.string(),
  lab: z.unknown(),
  clinicId: z.string(),
  clinic: z.unknown(),
  invoiceNumber: z.string(),
  status: z.unknown(),
  notes: z.string().optional(),
  subtotal: z.number(),
  discountAmount: z.number(),
  appliedDiscountPercentage: z.number().optional(),
  discountReason: z.string().optional(),
  total: z.number(),
  amountPaid: z.number(),
  amountDue: z.number(),
  issuedAt: z.date().optional(),
  dueDate: z.date().optional(),
  publicToken: z.string().optional(),
  publicLinkExpiresAt: z.date().optional(),
  cases: z.array(z.unknown()),
  payments: z.array(z.unknown()),
  createdAt: z.date(),
  updatedAt: z.date()
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