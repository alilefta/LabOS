import * as z from 'zod';
import { PaymentMethodSchema } from '../../enums/PaymentMethod.schema';
// prettier-ignore
export const InvoicePaymentInputSchema = z.object({
    id: z.string(),
    invoiceId: z.string(),
    invoice: z.unknown(),
    labId: z.string(),
    lab: z.unknown(),
    amount: z.number(),
    method: PaymentMethodSchema,
    reference: z.string().optional().nullable(),
    notes: z.string().optional().nullable(),
    paidAt: z.date(),
    createdAt: z.date()
}).strict();

export type InvoicePaymentInputType = z.infer<typeof InvoicePaymentInputSchema>;
