import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  commissionValue: z.literal(true).optional(),
  commissionTotal: z.literal(true).optional()
}).strict();
export const CaseStaffAssignmentSumAggregateInputObjectSchema: z.ZodType<Prisma.CaseStaffAssignmentSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.CaseStaffAssignmentSumAggregateInputType>;
export const CaseStaffAssignmentSumAggregateInputObjectZodSchema = makeSchema();
