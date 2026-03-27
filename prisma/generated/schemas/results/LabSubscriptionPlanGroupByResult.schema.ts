import * as z from 'zod';
export const LabSubscriptionPlanGroupByResultSchema = z.array(z.object({
  id: z.string(),
  labId: z.string(),
  maxMembers: z.number().int(),
  maxCasesMonth: z.number().int(),
  stripeCustomerId: z.string(),
  stripeSubscriptionId: z.string(),
  stripePriceId: z.string(),
  subscriptionNextRenewal: z.date(),
  isCancelled: z.boolean(),
  cancellationDate: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
  _count: z.object({
    id: z.number(),
    labId: z.number(),
    lab: z.number(),
    tier: z.number(),
    maxMembers: z.number(),
    maxCasesMonth: z.number(),
    stripeCustomerId: z.number(),
    stripeSubscriptionId: z.number(),
    stripePriceId: z.number(),
    subscriptionNextRenewal: z.number(),
    isCancelled: z.number(),
    cancellationDate: z.number(),
    createdAt: z.number(),
    updatedAt: z.number()
  }).optional(),
  _sum: z.object({
    maxMembers: z.number().nullable(),
    maxCasesMonth: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    maxMembers: z.number().nullable(),
    maxCasesMonth: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable(),
    labId: z.string().nullable(),
    maxMembers: z.number().int().nullable(),
    maxCasesMonth: z.number().int().nullable(),
    stripeCustomerId: z.string().nullable(),
    stripeSubscriptionId: z.string().nullable(),
    stripePriceId: z.string().nullable(),
    subscriptionNextRenewal: z.date().nullable(),
    cancellationDate: z.date().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    labId: z.string().nullable(),
    maxMembers: z.number().int().nullable(),
    maxCasesMonth: z.number().int().nullable(),
    stripeCustomerId: z.string().nullable(),
    stripeSubscriptionId: z.string().nullable(),
    stripePriceId: z.string().nullable(),
    subscriptionNextRenewal: z.date().nullable(),
    cancellationDate: z.date().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()
}));