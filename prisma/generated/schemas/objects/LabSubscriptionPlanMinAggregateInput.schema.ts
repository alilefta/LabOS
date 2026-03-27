import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  labId: z.literal(true).optional(),
  tier: z.literal(true).optional(),
  maxMembers: z.literal(true).optional(),
  maxCasesMonth: z.literal(true).optional(),
  stripeCustomerId: z.literal(true).optional(),
  stripeSubscriptionId: z.literal(true).optional(),
  stripePriceId: z.literal(true).optional(),
  subscriptionNextRenewal: z.literal(true).optional(),
  isCancelled: z.literal(true).optional(),
  cancellationDate: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const LabSubscriptionPlanMinAggregateInputObjectSchema: z.ZodType<Prisma.LabSubscriptionPlanMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.LabSubscriptionPlanMinAggregateInputType>;
export const LabSubscriptionPlanMinAggregateInputObjectZodSchema = makeSchema();
