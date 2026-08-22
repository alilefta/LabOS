import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { OrganizationArgsObjectSchema as OrganizationArgsObjectSchema } from './OrganizationArgs.schema';
import { AuthUserArgsObjectSchema as AuthUserArgsObjectSchema } from './AuthUserArgs.schema';
import { LabStaffInvitationIntentArgsObjectSchema as LabStaffInvitationIntentArgsObjectSchema } from './LabStaffInvitationIntentArgs.schema'

const makeSchema = () => z.object({
  organization: z.union([z.boolean(), z.lazy(() => OrganizationArgsObjectSchema)]).optional(),
  authuser: z.union([z.boolean(), z.lazy(() => AuthUserArgsObjectSchema)]).optional(),
  labStaffIntent: z.union([z.boolean(), z.lazy(() => LabStaffInvitationIntentArgsObjectSchema)]).optional()
}).strict();
export const InvitationIncludeObjectSchema: z.ZodType<Prisma.InvitationInclude> = makeSchema() as unknown as z.ZodType<Prisma.InvitationInclude>;
export const InvitationIncludeObjectZodSchema = makeSchema();
