import * as z from 'zod';
import { SupportedCurrencySchema } from '../../enums/SupportedCurrency.schema';
import { SupportedLanguageSchema } from '../../enums/SupportedLanguage.schema';
// prettier-ignore
export const LabSettingsInputSchema = z.object({
    id: z.string(),
    labId: z.string(),
    lab: z.unknown(),
    currency: SupportedCurrencySchema,
    language: SupportedLanguageSchema,
    timezone: z.string(),
    taxRatePercentage: z.number(),
    invoicePrefix: z.string(),
    requirePaymentToDeliver: z.boolean(),
    autoSendWhatsAppOnCompletion: z.boolean(),
    autoEmailInvoices: z.boolean(),
    updatedAt: z.date()
}).strict();

export type LabSettingsInputType = z.infer<typeof LabSettingsInputSchema>;
