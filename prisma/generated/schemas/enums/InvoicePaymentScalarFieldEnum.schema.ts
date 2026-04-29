import * as z from 'zod';

export const InvoicePaymentScalarFieldEnumSchema = z.enum(['id', 'invoiceId', 'labId', 'amount', 'method', 'reference', 'notes', 'paidAt', 'createdAt'])

export type InvoicePaymentScalarFieldEnum = z.infer<typeof InvoicePaymentScalarFieldEnumSchema>;