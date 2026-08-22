import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvitationArgsObjectSchema as InvitationArgsObjectSchema } from './InvitationArgs.schema';
import { LabStaffArgsObjectSchema as LabStaffArgsObjectSchema } from './LabStaffArgs.schema'

const makeSchema = () => z.object({
  invitation: z.union([z.boolean(), z.lazy(() => InvitationArgsObjectSchema)]).optional(),
  labStaff: z.union([z.boolean(), z.lazy(() => LabStaffArgsObjectSchema)]).optional()
}).strict();
export const LabStaffInvitationIntentIncludeObjectSchema: z.ZodType<Prisma.LabStaffInvitationIntentInclude> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffInvitationIntentInclude>;
export const LabStaffInvitationIntentIncludeObjectZodSchema = makeSchema();
