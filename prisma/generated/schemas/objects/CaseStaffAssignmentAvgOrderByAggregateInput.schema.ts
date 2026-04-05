import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  commissionValue: SortOrderSchema.optional(),
  commissionTotal: SortOrderSchema.optional()
}).strict();
export const CaseStaffAssignmentAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.CaseStaffAssignmentAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseStaffAssignmentAvgOrderByAggregateInput>;
export const CaseStaffAssignmentAvgOrderByAggregateInputObjectZodSchema = makeSchema();
