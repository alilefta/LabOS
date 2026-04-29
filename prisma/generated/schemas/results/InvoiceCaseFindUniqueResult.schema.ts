import * as z from 'zod';
export const InvoiceCaseFindUniqueResultSchema = z.nullable(z.object({
  invoiceId: z.string(),
  invoice: z.unknown(),
  caseId: z.string(),
  case: z.unknown(),
  caseTotal: z.number()
}));