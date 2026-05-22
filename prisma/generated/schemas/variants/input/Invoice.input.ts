import * as z from 'zod';
import { InvoiceStatusSchema } from '../../enums/InvoiceStatus.schema';
// prettier-ignore
export const InvoiceInputSchema = z.object({
    id: z.string(),
    labId: z.string(),
    lab: z.unknown(),
    clinicId: z.string(),
    clinic: z.unknown(),
    invoiceNumber: z.string(),
    status: InvoiceStatusSchema,
    notes: z.string().optional().nullable(),
    subtotal: z.number(),
    discountAmount: z.number(),
    appliedDiscountPercentage: z.number().optional().nullable(),
    discountReason: z.string().optional().nullable(),
    total: z.number(),
    amountPaid: z.number(),
    amountDue: z.number(),
    issuedAt: z.date().optional().nullable(),
    dueDate: z.date().optional().nullable(),
    publicToken: z.string().optional().nullable(),
    publicLinkExpiresAt: z.date().optional().nullable(),
    cases: z.array(z.unknown()),
    payments: z.array(z.unknown()),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type InvoiceInputType = z.infer<typeof InvoiceInputSchema>;
