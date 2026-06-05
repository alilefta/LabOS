import * as z from 'zod';

export const SupportedCurrencySchema = z.enum(['IQD', 'USD', 'AED', 'SAR', 'EUR'])

export type SupportedCurrency = z.infer<typeof SupportedCurrencySchema>;