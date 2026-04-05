import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { CaseStaffAssignmentCountOrderByAggregateInputObjectSchema as CaseStaffAssignmentCountOrderByAggregateInputObjectSchema } from './CaseStaffAssignmentCountOrderByAggregateInput.schema';
import { CaseStaffAssignmentAvgOrderByAggregateInputObjectSchema as CaseStaffAssignmentAvgOrderByAggregateInputObjectSchema } from './CaseStaffAssignmentAvgOrderByAggregateInput.schema';
import { CaseStaffAssignmentMaxOrderByAggregateInputObjectSchema as CaseStaffAssignmentMaxOrderByAggregateInputObjectSchema } from './CaseStaffAssignmentMaxOrderByAggregateInput.schema';
import { CaseStaffAssignmentMinOrderByAggregateInputObjectSchema as CaseStaffAssignmentMinOrderByAggregateInputObjectSchema } from './CaseStaffAssignmentMinOrderByAggregateInput.schema';
import { CaseStaffAssignmentSumOrderByAggregateInputObjectSchema as CaseStaffAssignmentSumOrderByAggregateInputObjectSchema } from './CaseStaffAssignmentSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  caseId: SortOrderSchema.optional(),
  staffId: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional(),
  roleCategory: SortOrderSchema.optional(),
  commissionType: SortOrderSchema.optional(),
  commissionValue: SortOrderSchema.optional(),
  commissionTotal: SortOrderSchema.optional(),
  isPaid: SortOrderSchema.optional(),
  paidAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => CaseStaffAssignmentCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => CaseStaffAssignmentAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => CaseStaffAssignmentMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => CaseStaffAssignmentMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => CaseStaffAssignmentSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const CaseStaffAssignmentOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.CaseStaffAssignmentOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseStaffAssignmentOrderByWithAggregationInput>;
export const CaseStaffAssignmentOrderByWithAggregationInputObjectZodSchema = makeSchema();
