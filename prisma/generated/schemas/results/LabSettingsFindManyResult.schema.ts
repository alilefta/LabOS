import * as z from 'zod';
export const LabSettingsFindManyResultSchema = z.object({
  data: z.array(z.object({
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
})),
  pagination: z.object({
  page: z.number().int().min(1),
  pageSize: z.number().int().min(1),
  total: z.number().int().min(0),
  totalPages: z.number().int().min(0),
  hasNext: z.boolean(),
  hasPrev: z.boolean()
})
});