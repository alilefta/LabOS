import * as z from 'zod';

export const InvoiceStatusSchema = z.enum(['DRAFT', 'SENT', 'PARTIAL', 'PAID', 'OVERDUE', 'CANCELLED'])

export type InvoiceStatus = z.infer<typeof InvoiceStatusSchema>;