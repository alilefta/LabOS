import * as z from 'zod';
// prettier-ignore
export const LabSubscriptionPlanModelSchema = z.object({
    id: z.string(),
    labId: z.string(),
    Lab: z.unknown(),
    subscriptionNextRenewal: z.date().nullable(),
    isCancelled: z.boolean(),
    cancellationDate: z.date().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type LabSubscriptionPlanPureType = z.infer<typeof LabSubscriptionPlanModelSchema>;
