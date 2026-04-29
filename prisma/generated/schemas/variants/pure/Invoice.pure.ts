import * as z from 'zod';
import { InvoiceStatusSchema } from '../../enums/InvoiceStatus.schema';
// prettier-ignore
export const InvoiceModelSchema = z.object({
    id: z.string(),
    labId: z.string(),
    lab: z.unknown(),
    clinicId: z.string(),
    clinic: z.unknown(),
    invoiceNumber: z.string(),
    status: InvoiceStatusSchema,
    notes: z.string().nullable(),
    subtotal: z.number(),
    discountAmount: z.number(),
    total: z.number(),
    amountPaid: z.number(),
    amountDue: z.number(),
    issuedAt: z.date().nullable(),
    dueDate: z.date().nullable(),
    publicToken: z.string().nullable(),
    publicLinkExpiresAt: z.date().nullable(),
    cases: z.array(z.unknown()),
    payments: z.array(z.unknown()),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type InvoicePureType = z.infer<typeof InvoiceModelSchema>;
