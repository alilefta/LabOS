import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const CaseStaffAssignmentOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.CaseStaffAssignmentOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseStaffAssignmentOrderByRelationAggregateInput>;
export const CaseStaffAssignmentOrderByRelationAggregateInputObjectZodSchema = makeSchema();
