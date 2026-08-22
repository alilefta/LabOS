import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { OrganizationCreateNestedOneWithoutInvitationsInputObjectSchema as OrganizationCreateNestedOneWithoutInvitationsInputObjectSchema } from './OrganizationCreateNestedOneWithoutInvitationsInput.schema';
import { AuthUserCreateNestedOneWithoutInvitationsInputObjectSchema as AuthUserCreateNestedOneWithoutInvitationsInputObjectSchema } from './AuthUserCreateNestedOneWithoutInvitationsInput.schema'

const makeSchema = () => z.object({
  id: z.string(),
  email: z.string(),
  role: z.string().optional().nullable(),
  status: z.string().optional(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  organization: z.lazy(() => OrganizationCreateNestedOneWithoutInvitationsInputObjectSchema),
  authuser: z.lazy(() => AuthUserCreateNestedOneWithoutInvitationsInputObjectSchema)
}).strict();
export const InvitationCreateWithoutLabStaffIntentInputObjectSchema: z.ZodType<Prisma.InvitationCreateWithoutLabStaffIntentInput> = makeSchema() as unknown as z.ZodType<Prisma.InvitationCreateWithoutLabStaffIntentInput>;
export const InvitationCreateWithoutLabStaffIntentInputObjectZodSchema = makeSchema();
