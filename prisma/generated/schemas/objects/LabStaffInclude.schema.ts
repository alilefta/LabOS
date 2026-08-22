import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabArgsObjectSchema as LabArgsObjectSchema } from './LabArgs.schema';
import { MemberArgsObjectSchema as MemberArgsObjectSchema } from './MemberArgs.schema';
import { LabStaffInvitationIntentArgsObjectSchema as LabStaffInvitationIntentArgsObjectSchema } from './LabStaffInvitationIntentArgs.schema';
import { LabUserArgsObjectSchema as LabUserArgsObjectSchema } from './LabUserArgs.schema';
import { LabInvitationArgsObjectSchema as LabInvitationArgsObjectSchema } from './LabInvitationArgs.schema';
import { CaseStaffAssignmentFindManySchema as CaseStaffAssignmentFindManySchema } from '../findManyCaseStaffAssignment.schema';
import { StaffPayoutFindManySchema as StaffPayoutFindManySchema } from '../findManyStaffPayout.schema';
import { LabStaffCountOutputTypeArgsObjectSchema as LabStaffCountOutputTypeArgsObjectSchema } from './LabStaffCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  lab: z.union([z.boolean(), z.lazy(() => LabArgsObjectSchema)]).optional(),
  member: z.union([z.boolean(), z.lazy(() => MemberArgsObjectSchema)]).optional(),
  organizationInvitationIntent: z.union([z.boolean(), z.lazy(() => LabStaffInvitationIntentArgsObjectSchema)]).optional(),
  labUser: z.union([z.boolean(), z.lazy(() => LabUserArgsObjectSchema)]).optional(),
  labInvitation: z.union([z.boolean(), z.lazy(() => LabInvitationArgsObjectSchema)]).optional(),
  caseAssignments: z.union([z.boolean(), z.lazy(() => CaseStaffAssignmentFindManySchema)]).optional(),
  staffPayouts: z.union([z.boolean(), z.lazy(() => StaffPayoutFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => LabStaffCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const LabStaffIncludeObjectSchema: z.ZodType<Prisma.LabStaffInclude> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffInclude>;
export const LabStaffIncludeObjectZodSchema = makeSchema();
