import * as z from 'zod';
export const InvoiceCaseFindManyResultSchema = z.object({
  data: z.array(z.object({
  invoiceId: z.string(),
  invoice: z.unknown(),
  caseId: z.string(),
  case: z.unknown(),
  caseTotal: z.number(),
  labId: z.string(),
  lab: z.unknown()
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