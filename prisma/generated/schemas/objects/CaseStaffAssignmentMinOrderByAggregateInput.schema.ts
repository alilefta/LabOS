import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

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
  paidAt: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const CaseStaffAssignmentMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.CaseStaffAssignmentMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseStaffAssignmentMinOrderByAggregateInput>;
export const CaseStaffAssignmentMinOrderByAggregateInputObjectZodSchema = makeSchema();
