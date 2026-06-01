import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { StaffPayoutCountOrderByAggregateInputObjectSchema as StaffPayoutCountOrderByAggregateInputObjectSchema } from './StaffPayoutCountOrderByAggregateInput.schema';
import { StaffPayoutAvgOrderByAggregateInputObjectSchema as StaffPayoutAvgOrderByAggregateInputObjectSchema } from './StaffPayoutAvgOrderByAggregateInput.schema';
import { StaffPayoutMaxOrderByAggregateInputObjectSchema as StaffPayoutMaxOrderByAggregateInputObjectSchema } from './StaffPayoutMaxOrderByAggregateInput.schema';
import { StaffPayoutMinOrderByAggregateInputObjectSchema as StaffPayoutMinOrderByAggregateInputObjectSchema } from './StaffPayoutMinOrderByAggregateInput.schema';
import { StaffPayoutSumOrderByAggregateInputObjectSchema as StaffPayoutSumOrderByAggregateInputObjectSchema } from './StaffPayoutSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  payoutNumber: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional(),
  staffId: SortOrderSchema.optional(),
  amount: SortOrderSchema.optional(),
  method: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  reference: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  notes: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  paidAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => StaffPayoutCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => StaffPayoutAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => StaffPayoutMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => StaffPayoutMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => StaffPayoutSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const StaffPayoutOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.StaffPayoutOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffPayoutOrderByWithAggregationInput>;
export const StaffPayoutOrderByWithAggregationInputObjectZodSchema = makeSchema();
