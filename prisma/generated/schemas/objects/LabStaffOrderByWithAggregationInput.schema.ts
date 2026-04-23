import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { LabStaffCountOrderByAggregateInputObjectSchema as LabStaffCountOrderByAggregateInputObjectSchema } from './LabStaffCountOrderByAggregateInput.schema';
import { LabStaffAvgOrderByAggregateInputObjectSchema as LabStaffAvgOrderByAggregateInputObjectSchema } from './LabStaffAvgOrderByAggregateInput.schema';
import { LabStaffMaxOrderByAggregateInputObjectSchema as LabStaffMaxOrderByAggregateInputObjectSchema } from './LabStaffMaxOrderByAggregateInput.schema';
import { LabStaffMinOrderByAggregateInputObjectSchema as LabStaffMinOrderByAggregateInputObjectSchema } from './LabStaffMinOrderByAggregateInput.schema';
import { LabStaffSumOrderByAggregateInputObjectSchema as LabStaffSumOrderByAggregateInputObjectSchema } from './LabStaffSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional(),
  firstName: SortOrderSchema.optional(),
  lastName: SortOrderSchema.optional(),
  phoneNumber: SortOrderSchema.optional(),
  avatarUrl: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  isActive: SortOrderSchema.optional(),
  city: SortOrderSchema.optional(),
  address1: SortOrderSchema.optional(),
  address2: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  zipcode: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  roleCategory: SortOrderSchema.optional(),
  jobTitle: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  specialization: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  commissionType: SortOrderSchema.optional(),
  commissionValue: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => LabStaffCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => LabStaffAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => LabStaffMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => LabStaffMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => LabStaffSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const LabStaffOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.LabStaffOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffOrderByWithAggregationInput>;
export const LabStaffOrderByWithAggregationInputObjectZodSchema = makeSchema();
