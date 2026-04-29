import * as z from 'zod';
export const InvoiceCaseCreateResultSchema = z.object({
  invoiceId: z.string(),
  invoice: z.unknown(),
  caseId: z.string(),
  case: z.unknown(),
  caseTotal: z.number()
});