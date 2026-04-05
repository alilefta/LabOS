import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  commissionValue: z.literal(true).optional(),
  commissionTotal: z.literal(true).optional()
}).strict();
export const CaseStaffAssignmentAvgAggregateInputObjectSchema: z.ZodType<Prisma.CaseStaffAssignmentAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.CaseStaffAssignmentAvgAggregateInputType>;
export const CaseStaffAssignmentAvgAggregateInputObjectZodSchema = makeSchema();
