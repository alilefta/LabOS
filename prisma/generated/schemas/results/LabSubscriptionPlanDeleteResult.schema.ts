import * as z from 'zod';
export const LabSubscriptionPlanDeleteResultSchema = z.nullable(z.object({
  id: z.string(),
  labId: z.string(),
  Lab: z.unknown(),
  subscriptionNextRenewal: z.date().optional(),
  isCancelled: z.boolean(),
  cancellationDate: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date()
}));