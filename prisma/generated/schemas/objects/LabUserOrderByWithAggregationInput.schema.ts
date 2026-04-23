import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { LabUserCountOrderByAggregateInputObjectSchema as LabUserCountOrderByAggregateInputObjectSchema } from './LabUserCountOrderByAggregateInput.schema';
import { LabUserMaxOrderByAggregateInputObjectSchema as LabUserMaxOrderByAggregateInputObjectSchema } from './LabUserMaxOrderByAggregateInput.schema';
import { LabUserMinOrderByAggregateInputObjectSchema as LabUserMinOrderByAggregateInputObjectSchema } from './LabUserMinOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional(),
  authUserId: SortOrderSchema.optional(),
  labStaffId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  role: SortOrderSchema.optional(),
  isActive: SortOrderSchema.optional(),
  lastTimeActive: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => LabUserCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => LabUserMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => LabUserMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const LabUserOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.LabUserOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUserOrderByWithAggregationInput>;
export const LabUserOrderByWithAggregationInputObjectZodSchema = makeSchema();
