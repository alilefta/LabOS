import * as z from 'zod';

export const LabSettingsScalarFieldEnumSchema = z.enum(['id', 'labId', 'currency', 'language', 'timezone', 'taxRatePercentage', 'invoicePrefix', 'requirePaymentToDeliver', 'autoSendWhatsAppOnCompletion', 'autoEmailInvoices', 'updatedAt'])

export type LabSettingsScalarFieldEnum = z.infer<typeof LabSettingsScalarFieldEnumSchema>;