import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { OrganizationCreateNestedOneWithoutInvitationsInputObjectSchema as OrganizationCreateNestedOneWithoutInvitationsInputObjectSchema } from './OrganizationCreateNestedOneWithoutInvitationsInput.schema';
import { LabStaffInvitationIntentCreateNestedOneWithoutInvitationInputObjectSchema as LabStaffInvitationIntentCreateNestedOneWithoutInvitationInputObjectSchema } from './LabStaffInvitationIntentCreateNestedOneWithoutInvitationInput.schema'

const makeSchema = () => z.object({
  id: z.string(),
  email: z.string(),
  role: z.string().optional().nullable(),
  status: z.string().optional(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  organization: z.lazy(() => OrganizationCreateNestedOneWithoutInvitationsInputObjectSchema),
  labStaffIntent: z.lazy(() => LabStaffInvitationIntentCreateNestedOneWithoutInvitationInputObjectSchema).optional()
}).strict();
export const InvitationCreateWithoutAuthuserInputObjectSchema: z.ZodType<Prisma.InvitationCreateWithoutAuthuserInput> = makeSchema() as unknown as z.ZodType<Prisma.InvitationCreateWithoutAuthuserInput>;
export const InvitationCreateWithoutAuthuserInputObjectZodSchema = makeSchema();
