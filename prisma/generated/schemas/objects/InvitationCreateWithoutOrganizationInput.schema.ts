import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { AuthUserCreateNestedOneWithoutInvitationsInputObjectSchema as AuthUserCreateNestedOneWithoutInvitationsInputObjectSchema } from './AuthUserCreateNestedOneWithoutInvitationsInput.schema';
import { LabStaffInvitationIntentCreateNestedOneWithoutInvitationInputObjectSchema as LabStaffInvitationIntentCreateNestedOneWithoutInvitationInputObjectSchema } from './LabStaffInvitationIntentCreateNestedOneWithoutInvitationInput.schema'

const makeSchema = () => z.object({
  id: z.string(),
  email: z.string(),
  role: z.string().optional().nullable(),
  status: z.string().optional(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  authuser: z.lazy(() => AuthUserCreateNestedOneWithoutInvitationsInputObjectSchema),
  labStaffIntent: z.lazy(() => LabStaffInvitationIntentCreateNestedOneWithoutInvitationInputObjectSchema).optional()
}).strict();
export const InvitationCreateWithoutOrganizationInputObjectSchema: z.ZodType<Prisma.InvitationCreateWithoutOrganizationInput> = makeSchema() as unknown as z.ZodType<Prisma.InvitationCreateWithoutOrganizationInput>;
export const InvitationCreateWithoutOrganizationInputObjectZodSchema = makeSchema();
