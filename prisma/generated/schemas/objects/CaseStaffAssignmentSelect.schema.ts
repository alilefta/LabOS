import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseArgsObjectSchema as CaseArgsObjectSchema } from './CaseArgs.schema';
import { LabStaffArgsObjectSchema as LabStaffArgsObjectSchema } from './LabStaffArgs.schema';
import { LabArgsObjectSchema as LabArgsObjectSchema } from './LabArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  caseId: z.boolean().optional(),
  case: z.union([z.boolean(), z.lazy(() => CaseArgsObjectSchema)]).optional(),
  staffId: z.boolean().optional(),
  staff: z.union([z.boolean(), z.lazy(() => LabStaffArgsObjectSchema)]).optional(),
  labId: z.boolean().optional(),
  lab: z.union([z.boolean(), z.lazy(() => LabArgsObjectSchema)]).optional(),
  roleCategory: z.boolean().optional(),
  commissionType: z.boolean().optional(),
  commissionValue: z.boolean().optional(),
  commissionTotal: z.boolean().optional(),
  isPaid: z.boolean().optional(),
  paidAt: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional()
}).strict();
export const CaseStaffAssignmentSelectObjectSchema: z.ZodType<Prisma.CaseStaffAssignmentSelect> = makeSchema() as unknown as z.ZodType<Prisma.CaseStaffAssignmentSelect>;
export const CaseStaffAssignmentSelectObjectZodSchema = makeSchema();
