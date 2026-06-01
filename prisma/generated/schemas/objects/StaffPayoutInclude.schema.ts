import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabArgsObjectSchema as LabArgsObjectSchema } from './LabArgs.schema';
import { LabStaffArgsObjectSchema as LabStaffArgsObjectSchema } from './LabStaffArgs.schema';
import { CaseStaffAssignmentFindManySchema as CaseStaffAssignmentFindManySchema } from '../findManyCaseStaffAssignment.schema';
import { StaffPayoutCountOutputTypeArgsObjectSchema as StaffPayoutCountOutputTypeArgsObjectSchema } from './StaffPayoutCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  lab: z.union([z.boolean(), z.lazy(() => LabArgsObjectSchema)]).optional(),
  staff: z.union([z.boolean(), z.lazy(() => LabStaffArgsObjectSchema)]).optional(),
  caseAssignments: z.union([z.boolean(), z.lazy(() => CaseStaffAssignmentFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => StaffPayoutCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const StaffPayoutIncludeObjectSchema: z.ZodType<Prisma.StaffPayoutInclude> = makeSchema() as unknown as z.ZodType<Prisma.StaffPayoutInclude>;
export const StaffPayoutIncludeObjectZodSchema = makeSchema();
