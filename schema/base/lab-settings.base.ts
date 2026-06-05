import z from 'zod'
import { SupportedCurrencySchema, SupportedLanguageSchema } from './enums.base'

export const LabSettingsBaseSchema = z.object({
	id: z.string(),
	labId: z.string(),
	currency: SupportedCurrencySchema,
	language: SupportedLanguageSchema,
	timezone: z.string(),
	taxRatePercentage: z.number(),
	invoicePrefix: z.string(),
	requirePaymentToDeliver: z.boolean(),
	autoSendWhatsAppOnCompletion: z.boolean(),
	autoEmailInvoices: z.boolean(),
	updatedAt: z.date(),
})

export type LabSettingsBase = z.infer<typeof LabSettingsBaseSchema>
