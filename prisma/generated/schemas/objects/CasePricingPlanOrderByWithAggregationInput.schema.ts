import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { CasePricingPlanCountOrderByAggregateInputObjectSchema as CasePricingPlanCountOrderByAggregateInputObjectSchema } from './CasePricingPlanCountOrderByAggregateInput.schema';
import { CasePricingPlanAvgOrderByAggregateInputObjectSchema as CasePricingPlanAvgOrderByAggregateInputObjectSchema } from './CasePricingPlanAvgOrderByAggregateInput.schema';
import { CasePricingPlanMaxOrderByAggregateInputObjectSchema as CasePricingPlanMaxOrderByAggregateInputObjectSchema } from './CasePricingPlanMaxOrderByAggregateInput.schema';
import { CasePricingPlanMinOrderByAggregateInputObjectSchema as CasePricingPlanMinOrderByAggregateInputObjectSchema } from './CasePricingPlanMinOrderByAggregateInput.schema';
import { CasePricingPlanSumOrderByAggregateInputObjectSchema as CasePricingPlanSumOrderByAggregateInputObjectSchema } from './CasePricingPlanSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  isDefault: SortOrderSchema.optional(),
  pricingStrategy: SortOrderSchema.optional(),
  firstToothPrice: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  additionalToothPrice: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  teethCountToApplyBulkPrice: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  bulkPrice: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  toothPrice: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  productId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  clinicId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => CasePricingPlanCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => CasePricingPlanAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => CasePricingPlanMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => CasePricingPlanMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => CasePricingPlanSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const CasePricingPlanOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.CasePricingPlanOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.CasePricingPlanOrderByWithAggregationInput>;
export const CasePricingPlanOrderByWithAggregationInputObjectZodSchema = makeSchema();
