import * as z from 'zod';
// prettier-ignore
export const InvoiceCaseInputSchema = z.object({
    invoiceId: z.string(),
    invoice: z.unknown(),
    caseId: z.string(),
    case: z.unknown(),
    caseTotal: z.number(),
    labId: z.string(),
    lab: z.unknown()
}).strict();

export type InvoiceCaseInputType = z.infer<typeof InvoiceCaseInputSchema>;
