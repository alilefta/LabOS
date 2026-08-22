import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabStaffInvitationIntentSelectObjectSchema as LabStaffInvitationIntentSelectObjectSchema } from './LabStaffInvitationIntentSelect.schema';
import { LabStaffInvitationIntentIncludeObjectSchema as LabStaffInvitationIntentIncludeObjectSchema } from './LabStaffInvitationIntentInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => LabStaffInvitationIntentSelectObjectSchema).optional(),
  include: z.lazy(() => LabStaffInvitationIntentIncludeObjectSchema).optional()
}).strict();
export const LabStaffInvitationIntentArgsObjectSchema = makeSchema();
export const LabStaffInvitationIntentArgsObjectZodSchema = makeSchema();
