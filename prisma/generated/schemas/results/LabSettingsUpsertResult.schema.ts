import * as z from 'zod';
export const LabSettingsUpsertResultSchema = z.object({
  id: z.string(),
  labId: z.string(),
  lab: z.unknown(),
  currency: z.unknown(),
  language: z.unknown(),
  timezone: z.string(),
  taxRatePercentage: z.number(),
  invoicePrefix: z.string(),
  requirePaymentToDeliver: z.boolean(),
  autoSendWhatsAppOnCompletion: z.boolean(),
  autoEmailInvoices: z.boolean(),
  updatedAt: z.date()
});