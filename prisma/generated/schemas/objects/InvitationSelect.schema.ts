import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { OrganizationArgsObjectSchema as OrganizationArgsObjectSchema } from './OrganizationArgs.schema';
import { AuthUserArgsObjectSchema as AuthUserArgsObjectSchema } from './AuthUserArgs.schema';
import { LabStaffInvitationIntentArgsObjectSchema as LabStaffInvitationIntentArgsObjectSchema } from './LabStaffInvitationIntentArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  organizationId: z.boolean().optional(),
  organization: z.union([z.boolean(), z.lazy(() => OrganizationArgsObjectSchema)]).optional(),
  email: z.boolean().optional(),
  role: z.boolean().optional(),
  status: z.boolean().optional(),
  expiresAt: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  inviterId: z.boolean().optional(),
  authuser: z.union([z.boolean(), z.lazy(() => AuthUserArgsObjectSchema)]).optional(),
  labStaffIntent: z.union([z.boolean(), z.lazy(() => LabStaffInvitationIntentArgsObjectSchema)]).optional()
}).strict();
export const InvitationSelectObjectSchema: z.ZodType<Prisma.InvitationSelect> = makeSchema() as unknown as z.ZodType<Prisma.InvitationSelect>;
export const InvitationSelectObjectZodSchema = makeSchema();
