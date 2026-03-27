import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabArgsObjectSchema as LabArgsObjectSchema } from './LabArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  labId: z.boolean().optional(),
  lab: z.union([z.boolean(), z.lazy(() => LabArgsObjectSchema)]).optional(),
  tier: z.boolean().optional(),
  maxMembers: z.boolean().optional(),
  maxCasesMonth: z.boolean().optional(),
  stripeCustomerId: z.boolean().optional(),
  stripeSubscriptionId: z.boolean().optional(),
  stripePriceId: z.boolean().optional(),
  subscriptionNextRenewal: z.boolean().optional(),
  isCancelled: z.boolean().optional(),
  cancellationDate: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional()
}).strict();
export const LabSubscriptionPlanSelectObjectSchema: z.ZodType<Prisma.LabSubscriptionPlanSelect> = makeSchema() as unknown as z.ZodType<Prisma.LabSubscriptionPlanSelect>;
export const LabSubscriptionPlanSelectObjectZodSchema = makeSchema();
