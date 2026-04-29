import * as z from 'zod';
// prettier-ignore
export const InvoiceCaseResultSchema = z.object({
    invoiceId: z.string(),
    invoice: z.unknown(),
    caseId: z.string(),
    case: z.unknown(),
    caseTotal: z.number()
}).strict();

export type InvoiceCaseResultType = z.infer<typeof InvoiceCaseResultSchema>;
