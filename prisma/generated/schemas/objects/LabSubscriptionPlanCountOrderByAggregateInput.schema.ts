import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional(),
  tier: SortOrderSchema.optional(),
  maxMembers: SortOrderSchema.optional(),
  maxCasesMonth: SortOrderSchema.optional(),
  stripeCustomerId: SortOrderSchema.optional(),
  stripeSubscriptionId: SortOrderSchema.optional(),
  stripePriceId: SortOrderSchema.optional(),
  subscriptionNextRenewal: SortOrderSchema.optional(),
  isCancelled: SortOrderSchema.optional(),
  cancellationDate: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const LabSubscriptionPlanCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.LabSubscriptionPlanCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.LabSubscriptionPlanCountOrderByAggregateInput>;
export const LabSubscriptionPlanCountOrderByAggregateInputObjectZodSchema = makeSchema();
