import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { LabSubscriptionPlanCountOrderByAggregateInputObjectSchema as LabSubscriptionPlanCountOrderByAggregateInputObjectSchema } from './LabSubscriptionPlanCountOrderByAggregateInput.schema';
import { LabSubscriptionPlanAvgOrderByAggregateInputObjectSchema as LabSubscriptionPlanAvgOrderByAggregateInputObjectSchema } from './LabSubscriptionPlanAvgOrderByAggregateInput.schema';
import { LabSubscriptionPlanMaxOrderByAggregateInputObjectSchema as LabSubscriptionPlanMaxOrderByAggregateInputObjectSchema } from './LabSubscriptionPlanMaxOrderByAggregateInput.schema';
import { LabSubscriptionPlanMinOrderByAggregateInputObjectSchema as LabSubscriptionPlanMinOrderByAggregateInputObjectSchema } from './LabSubscriptionPlanMinOrderByAggregateInput.schema';
import { LabSubscriptionPlanSumOrderByAggregateInputObjectSchema as LabSubscriptionPlanSumOrderByAggregateInputObjectSchema } from './LabSubscriptionPlanSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional(),
  tier: SortOrderSchema.optional(),
  maxMembers: SortOrderSchema.optional(),
  maxCasesMonth: SortOrderSchema.optional(),
  stripeCustomerId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  stripeSubscriptionId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  stripePriceId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  subscriptionNextRenewal: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  isCancelled: SortOrderSchema.optional(),
  cancellationDate: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => LabSubscriptionPlanCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => LabSubscriptionPlanAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => LabSubscriptionPlanMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => LabSubscriptionPlanMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => LabSubscriptionPlanSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const LabSubscriptionPlanOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.LabSubscriptionPlanOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.LabSubscriptionPlanOrderByWithAggregationInput>;
export const LabSubscriptionPlanOrderByWithAggregationInputObjectZodSchema = makeSchema();
