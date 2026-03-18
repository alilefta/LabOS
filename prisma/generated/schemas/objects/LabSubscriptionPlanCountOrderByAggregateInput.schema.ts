import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional(),
  subscriptionNextRenewal: SortOrderSchema.optional(),
  isCancelled: SortOrderSchema.optional(),
  cancellationDate: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const LabSubscriptionPlanCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.LabSubscriptionPlanCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.LabSubscriptionPlanCountOrderByAggregateInput>;
export const LabSubscriptionPlanCountOrderByAggregateInputObjectZodSchema = makeSchema();
