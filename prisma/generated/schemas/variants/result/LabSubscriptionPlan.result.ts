import * as z from 'zod';
import { SubscriptionTierSchema } from '../../enums/SubscriptionTier.schema';
// prettier-ignore
export const LabSubscriptionPlanResultSchema = z.object({
    id: z.string(),
    labId: z.string(),
    lab: z.unknown(),
    tier: SubscriptionTierSchema,
    maxMembers: z.number().int(),
    maxCasesMonth: z.number().int(),
    stripeCustomerId: z.string().nullable(),
    stripeSubscriptionId: z.string().nullable(),
    stripePriceId: z.string().nullable(),
    subscriptionNextRenewal: z.date().nullable(),
    isCancelled: z.boolean(),
    cancellationDate: z.date().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type LabSubscriptionPlanResultType = z.infer<typeof LabSubscriptionPlanResultSchema>;
