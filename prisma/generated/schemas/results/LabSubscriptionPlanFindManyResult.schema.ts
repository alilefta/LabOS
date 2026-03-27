import * as z from 'zod';
export const LabSubscriptionPlanFindManyResultSchema = z.object({
  data: z.array(z.object({
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
})),
  pagination: z.object({
  page: z.number().int().min(1),
  pageSize: z.number().int().min(1),
  total: z.number().int().min(0),
  totalPages: z.number().int().min(0),
  hasNext: z.boolean(),
  hasPrev: z.boolean()
})
});