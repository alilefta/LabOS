import * as z from 'zod';
import { PaymentMethodSchema } from '../../enums/PaymentMethod.schema';
// prettier-ignore
export const InvoicePaymentModelSchema = z.object({
    id: z.string(),
    invoiceId: z.string(),
    invoice: z.unknown(),
    labId: z.string(),
    lab: z.unknown(),
    amount: z.number(),
    method: PaymentMethodSchema,
    reference: z.string().nullable(),
    notes: z.string().nullable(),
    paidAt: z.date(),
    createdAt: z.date()
}).strict();

export type InvoicePaymentPureType = z.infer<typeof InvoicePaymentModelSchema>;
