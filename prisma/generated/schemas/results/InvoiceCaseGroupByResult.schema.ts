import * as z from 'zod';
export const InvoiceCaseGroupByResultSchema = z.array(z.object({
  invoiceId: z.string(),
  caseId: z.string(),
  caseTotal: z.number(),
  _count: z.object({
    invoiceId: z.number(),
    invoice: z.number(),
    caseId: z.number(),
    case: z.number(),
    caseTotal: z.number()
  }).optional(),
  _sum: z.object({
    caseTotal: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    caseTotal: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    invoiceId: z.string().nullable(),
    caseId: z.string().nullable(),
    caseTotal: z.number().nullable()
  }).nullable().optional(),
  _max: z.object({
    invoiceId: z.string().nullable(),
    caseId: z.string().nullable(),
    caseTotal: z.number().nullable()
  }).nullable().optional()
}));