import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseArgsObjectSchema as CaseArgsObjectSchema } from './CaseArgs.schema';
import { LabStaffArgsObjectSchema as LabStaffArgsObjectSchema } from './LabStaffArgs.schema';
import { LabArgsObjectSchema as LabArgsObjectSchema } from './LabArgs.schema';
import { StaffPayoutArgsObjectSchema as StaffPayoutArgsObjectSchema } from './StaffPayoutArgs.schema'

const makeSchema = () => z.object({
  dentalCase: z.union([z.boolean(), z.lazy(() => CaseArgsObjectSchema)]).optional(),
  staff: z.union([z.boolean(), z.lazy(() => LabStaffArgsObjectSchema)]).optional(),
  lab: z.union([z.boolean(), z.lazy(() => LabArgsObjectSchema)]).optional(),
  payout: z.union([z.boolean(), z.lazy(() => StaffPayoutArgsObjectSchema)]).optional()
}).strict();
export const CaseStaffAssignmentIncludeObjectSchema: z.ZodType<Prisma.CaseStaffAssignmentInclude> = makeSchema() as unknown as z.ZodType<Prisma.CaseStaffAssignmentInclude>;
export const CaseStaffAssignmentIncludeObjectZodSchema = makeSchema();
