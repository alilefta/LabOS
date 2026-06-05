import * as z from 'zod';
export const LabSettingsGroupByResultSchema = z.array(z.object({
  id: z.string(),
  labId: z.string(),
  timezone: z.string(),
  taxRatePercentage: z.number(),
  invoicePrefix: z.string(),
  requirePaymentToDeliver: z.boolean(),
  autoSendWhatsAppOnCompletion: z.boolean(),
  autoEmailInvoices: z.boolean(),
  updatedAt: z.date(),
  _count: z.object({
    id: z.number(),
    labId: z.number(),
    lab: z.number(),
    currency: z.number(),
    language: z.number(),
    timezone: z.number(),
    taxRatePercentage: z.number(),
    invoicePrefix: z.number(),
    requirePaymentToDeliver: z.number(),
    autoSendWhatsAppOnCompletion: z.number(),
    autoEmailInvoices: z.number(),
    updatedAt: z.number()
  }).optional(),
  _sum: z.object({
    taxRatePercentage: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    taxRatePercentage: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable(),
    labId: z.string().nullable(),
    timezone: z.string().nullable(),
    taxRatePercentage: z.number().nullable(),
    invoicePrefix: z.string().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    labId: z.string().nullable(),
    timezone: z.string().nullable(),
    taxRatePercentage: z.number().nullable(),
    invoicePrefix: z.string().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()
}));