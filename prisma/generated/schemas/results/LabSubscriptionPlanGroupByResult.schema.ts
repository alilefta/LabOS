import * as z from 'zod';
export const LabSubscriptionPlanGroupByResultSchema = z.array(z.object({
  id: z.string(),
  labId: z.string(),
  subscriptionNextRenewal: z.date(),
  isCancelled: z.boolean(),
  cancellationDate: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
  _count: z.object({
    id: z.number(),
    labId: z.number(),
    Lab: z.number(),
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
  }).nullable().optional()
}));