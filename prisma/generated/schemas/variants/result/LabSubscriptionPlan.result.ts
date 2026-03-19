import * as z from 'zod';
// prettier-ignore
export const LabSubscriptionPlanResultSchema = z.object({
    id: z.string(),
    labId: z.string(),
    lab: z.unknown(),
    subscriptionNextRenewal: z.date().nullable(),
    isCancelled: z.boolean(),
    cancellationDate: z.date().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type LabSubscriptionPlanResultType = z.infer<typeof LabSubscriptionPlanResultSchema>;
