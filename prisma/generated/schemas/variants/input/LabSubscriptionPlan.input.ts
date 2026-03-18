import * as z from 'zod';
// prettier-ignore
export const LabSubscriptionPlanInputSchema = z.object({
    id: z.string(),
    labId: z.string(),
    Lab: z.unknown(),
    subscriptionNextRenewal: z.date().optional().nullable(),
    isCancelled: z.boolean(),
    cancellationDate: z.date().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type LabSubscriptionPlanInputType = z.infer<typeof LabSubscriptionPlanInputSchema>;
