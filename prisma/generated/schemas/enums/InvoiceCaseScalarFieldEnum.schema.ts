import * as z from 'zod';

export const InvoiceCaseScalarFieldEnumSchema = z.enum(['invoiceId', 'caseId', 'caseTotal'])

export type InvoiceCaseScalarFieldEnum = z.infer<typeof InvoiceCaseScalarFieldEnumSchema>;