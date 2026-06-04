import * as z from 'zod';

export const InvoiceScalarFieldEnumSchema = z.enum(['id', 'labId', 'clinicId', 'invoiceNumber', 'status', 'notes', 'subtotal', 'discountAmount', 'appliedDiscountPercentage', 'discountReason', 'total', 'amountPaid', 'amountDue', 'issuedAt', 'dueDate', 'publicToken', 'publicLinkExpiresAt', 'isActive', 'createdAt', 'updatedAt'])

export type InvoiceScalarFieldEnum = z.infer<typeof InvoiceScalarFieldEnumSchema>;