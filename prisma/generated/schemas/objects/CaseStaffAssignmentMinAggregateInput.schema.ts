import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  caseId: z.literal(true).optional(),
  staffId: z.literal(true).optional(),
  labId: z.literal(true).optional(),
  roleCategory: z.literal(true).optional(),
  commissionType: z.literal(true).optional(),
  commissionValue: z.literal(true).optional(),
  commissionTotal: z.literal(true).optional(),
  isPaid: z.literal(true).optional(),
  paidAt: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const CaseStaffAssignmentMinAggregateInputObjectSchema: z.ZodType<Prisma.CaseStaffAssignmentMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.CaseStaffAssignmentMinAggregateInputType>;
export const CaseStaffAssignmentMinAggregateInputObjectZodSchema = makeSchema();
