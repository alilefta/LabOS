import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { LabSubscriptionPlanCountOrderByAggregateInputObjectSchema as LabSubscriptionPlanCountOrderByAggregateInputObjectSchema } from './LabSubscriptionPlanCountOrderByAggregateInput.schema';
import { LabSubscriptionPlanMaxOrderByAggregateInputObjectSchema as LabSubscriptionPlanMaxOrderByAggregateInputObjectSchema } from './LabSubscriptionPlanMaxOrderByAggregateInput.schema';
import { LabSubscriptionPlanMinOrderByAggregateInputObjectSchema as LabSubscriptionPlanMinOrderByAggregateInputObjectSchema } from './LabSubscriptionPlanMinOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional(),
  subscriptionNextRenewal: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  isCancelled: SortOrderSchema.optional(),
  cancellationDate: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => LabSubscriptionPlanCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => LabSubscriptionPlanMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => LabSubscriptionPlanMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const LabSubscriptionPlanOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.LabSubscriptionPlanOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.LabSubscriptionPlanOrderByWithAggregationInput>;
export const LabSubscriptionPlanOrderByWithAggregationInputObjectZodSchema = makeSchema();
