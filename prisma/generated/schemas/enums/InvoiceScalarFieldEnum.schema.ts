import * as z from 'zod';

export const InvoiceScalarFieldEnumSchema = z.enum(['id', 'labId', 'clinicId', 'invoiceNumber', 'status', 'notes', 'subtotal', 'discountAmount', 'total', 'amountPaid', 'amountDue', 'issuedAt', 'dueDate', 'publicToken', 'publicLinkExpiresAt', 'createdAt', 'updatedAt'])

export type InvoiceScalarFieldEnum = z.infer<typeof InvoiceScalarFieldEnumSchema>;