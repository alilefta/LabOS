import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabStaffInvitationIntentUncheckedCreateNestedOneWithoutInvitationInputObjectSchema as LabStaffInvitationIntentUncheckedCreateNestedOneWithoutInvitationInputObjectSchema } from './LabStaffInvitationIntentUncheckedCreateNestedOneWithoutInvitationInput.schema'

const makeSchema = () => z.object({
  id: z.string(),
  organizationId: z.string(),
  email: z.string(),
  role: z.string().optional().nullable(),
  status: z.string().optional(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  inviterId: z.string(),
  labStaffIntent: z.lazy(() => LabStaffInvitationIntentUncheckedCreateNestedOneWithoutInvitationInputObjectSchema).optional()
}).strict();
export const InvitationUncheckedCreateInputObjectSchema: z.ZodType<Prisma.InvitationUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.InvitationUncheckedCreateInput>;
export const InvitationUncheckedCreateInputObjectZodSchema = makeSchema();
