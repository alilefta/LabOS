import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvitationArgsObjectSchema as InvitationArgsObjectSchema } from './InvitationArgs.schema';
import { LabStaffArgsObjectSchema as LabStaffArgsObjectSchema } from './LabStaffArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  invitationId: z.boolean().optional(),
  invitation: z.union([z.boolean(), z.lazy(() => InvitationArgsObjectSchema)]).optional(),
  labId: z.boolean().optional(),
  labStaffId: z.boolean().optional(),
  labStaff: z.union([z.boolean(), z.lazy(() => LabStaffArgsObjectSchema)]).optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional()
}).strict();
export const LabStaffInvitationIntentSelectObjectSchema: z.ZodType<Prisma.LabStaffInvitationIntentSelect> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffInvitationIntentSelect>;
export const LabStaffInvitationIntentSelectObjectZodSchema = makeSchema();
