import * as z from 'zod';
import { SubscriptionTierSchema } from '../../enums/SubscriptionTier.schema';
// prettier-ignore
export const LabSubscriptionPlanInputSchema = z.object({
    id: z.string(),
    labId: z.string(),
    lab: z.unknown(),
    tier: SubscriptionTierSchema,
    maxMembers: z.number().int(),
    maxCasesMonth: z.number().int(),
    stripeCustomerId: z.string().optional().nullable(),
    stripeSubscriptionId: z.string().optional().nullable(),
    stripePriceId: z.string().optional().nullable(),
    subscriptionNextRenewal: z.date().optional().nullable(),
    isCancelled: z.boolean(),
    cancellationDate: z.date().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type LabSubscriptionPlanInputType = z.infer<typeof LabSubscriptionPlanInputSchema>;
