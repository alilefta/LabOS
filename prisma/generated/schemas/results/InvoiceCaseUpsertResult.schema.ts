import * as z from 'zod';
export const InvoiceCaseUpsertResultSchema = z.object({
  invoiceId: z.string(),
  invoice: z.unknown(),
  caseId: z.string(),
  case: z.unknown(),
  caseTotal: z.number(),
  labId: z.string(),
  lab: z.unknown()
});