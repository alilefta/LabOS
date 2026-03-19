import * as z from 'zod';
export const LabSubscriptionPlanAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    labId: z.number(),
    lab: z.number(),
    subscriptionNextRenewal: z.number(),
    isCancelled: z.number(),
    cancellationDate: z.number(),
    createdAt: z.number(),
    updatedAt: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    labId: z.string().nullable(),
    subscriptionNextRenewal: z.date().nullable(),
    cancellationDate: z.date().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    labId: z.string().nullable(),
    subscriptionNextRenewal: z.date().nullable(),
    cancellationDate: z.date().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()});