import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabStaffInvitationIntentUncheckedCreateNestedOneWithoutInvitationInputObjectSchema as LabStaffInvitationIntentUncheckedCreateNestedOneWithoutInvitationInputObjectSchema } from './LabStaffInvitationIntentUncheckedCreateNestedOneWithoutInvitationInput.schema'

const makeSchema = () => z.object({
  id: z.string(),
  email: z.string(),
  role: z.string().optional().nullable(),
  status: z.string().optional(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  inviterId: z.string(),
  labStaffIntent: z.lazy(() => LabStaffInvitationIntentUncheckedCreateNestedOneWithoutInvitationInputObjectSchema).optional()
}).strict();
export const InvitationUncheckedCreateWithoutOrganizationInputObjectSchema: z.ZodType<Prisma.InvitationUncheckedCreateWithoutOrganizationInput> = makeSchema() as unknown as z.ZodType<Prisma.InvitationUncheckedCreateWithoutOrganizationInput>;
export const InvitationUncheckedCreateWithoutOrganizationInputObjectZodSchema = makeSchema();
