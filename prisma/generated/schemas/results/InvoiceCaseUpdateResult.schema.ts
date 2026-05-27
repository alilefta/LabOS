import * as z from 'zod';
export const InvoiceCaseUpdateResultSchema = z.nullable(z.object({
  invoiceId: z.string(),
  invoice: z.unknown(),
  caseId: z.string(),
  case: z.unknown(),
  caseTotal: z.number(),
  labId: z.string(),
  lab: z.unknown()
}));