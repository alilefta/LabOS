import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SubscriptionTierSchema } from '../enums/SubscriptionTier.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  labId: z.string(),
  tier: SubscriptionTierSchema.optional(),
  maxMembers: z.number().int().optional(),
  maxCasesMonth: z.number().int().optional(),
  stripeCustomerId: z.string().optional().nullable(),
  stripeSubscriptionId: z.string().optional().nullable(),
  stripePriceId: z.string().optional().nullable(),
  subscriptionNextRenewal: z.coerce.date().optional().nullable(),
  isCancelled: z.boolean().optional(),
  cancellationDate: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional()
}).strict();
export const LabSubscriptionPlanUncheckedCreateInputObjectSchema: z.ZodType<Prisma.LabSubscriptionPlanUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.LabSubscriptionPlanUncheckedCreateInput>;
export const LabSubscriptionPlanUncheckedCreateInputObjectZodSchema = makeSchema();
