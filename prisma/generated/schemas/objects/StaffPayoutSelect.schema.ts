import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabArgsObjectSchema as LabArgsObjectSchema } from './LabArgs.schema';
import { LabStaffArgsObjectSchema as LabStaffArgsObjectSchema } from './LabStaffArgs.schema';
import { CaseStaffAssignmentFindManySchema as CaseStaffAssignmentFindManySchema } from '../findManyCaseStaffAssignment.schema';
import { StaffPayoutCountOutputTypeArgsObjectSchema as StaffPayoutCountOutputTypeArgsObjectSchema } from './StaffPayoutCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  payoutNumber: z.boolean().optional(),
  labId: z.boolean().optional(),
  lab: z.union([z.boolean(), z.lazy(() => LabArgsObjectSchema)]).optional(),
  staffId: z.boolean().optional(),
  staff: z.union([z.boolean(), z.lazy(() => LabStaffArgsObjectSchema)]).optional(),
  amount: z.boolean().optional(),
  method: z.boolean().optional(),
  status: z.boolean().optional(),
  reference: z.boolean().optional(),
  notes: z.boolean().optional(),
  caseAssignments: z.union([z.boolean(), z.lazy(() => CaseStaffAssignmentFindManySchema)]).optional(),
  paidAt: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  _count: z.union([z.boolean(), z.lazy(() => StaffPayoutCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const StaffPayoutSelectObjectSchema: z.ZodType<Prisma.StaffPayoutSelect> = makeSchema() as unknown as z.ZodType<Prisma.StaffPayoutSelect>;
export const StaffPayoutSelectObjectZodSchema = makeSchema();
