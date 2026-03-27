import * as z from 'zod';

export const LabSubscriptionPlanScalarFieldEnumSchema = z.enum(['id', 'labId', 'tier', 'maxMembers', 'maxCasesMonth', 'stripeCustomerId', 'stripeSubscriptionId', 'stripePriceId', 'subscriptionNextRenewal', 'isCancelled', 'cancellationDate', 'createdAt', 'updatedAt'])

export type LabSubscriptionPlanScalarFieldEnum = z.infer<typeof LabSubscriptionPlanScalarFieldEnumSchema>;