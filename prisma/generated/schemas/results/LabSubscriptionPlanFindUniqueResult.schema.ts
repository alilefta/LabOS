import * as z from 'zod';
export const LabSubscriptionPlanFindUniqueResultSchema = z.nullable(z.object({
  id: z.string(),
  labId: z.string(),
  lab: z.unknown(),
  tier: z.unknown(),
  maxMembers: z.number().int(),
  maxCasesMonth: z.number().int(),
  stripeCustomerId: z.string().optional(),
  stripeSubscriptionId: z.string().optional(),
  stripePriceId: z.string().optional(),
  subscriptionNextRenewal: z.date().optional(),
  isCancelled: z.boolean(),
  cancellationDate: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date()
}));