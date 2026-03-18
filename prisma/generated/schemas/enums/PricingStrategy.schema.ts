import * as z from 'zod';

export const PricingStrategySchema = z.enum(['BULK', 'PERTOOTH', 'CUSTOM'])

export type PricingStrategy = z.infer<typeof PricingStrategySchema>;