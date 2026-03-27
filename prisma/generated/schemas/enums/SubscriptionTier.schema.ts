import * as z from 'zod';

export const SubscriptionTierSchema = z.enum(['FREE', 'STARTER', 'PROFESSIONAL', 'ENTERPRISE'])

export type SubscriptionTier = z.infer<typeof SubscriptionTierSchema>;