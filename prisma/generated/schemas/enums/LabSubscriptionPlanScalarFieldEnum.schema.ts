import * as z from 'zod';

export const LabSubscriptionPlanScalarFieldEnumSchema = z.enum(['id', 'labId', 'subscriptionNextRenewal', 'isCancelled', 'cancellationDate', 'createdAt', 'updatedAt'])

export type LabSubscriptionPlanScalarFieldEnum = z.infer<typeof LabSubscriptionPlanScalarFieldEnumSchema>;