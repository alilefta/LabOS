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
  labStaffIntent: z.lazy(() => LabStaffInvitationIntentUncheckedCreateNestedOneWithoutInvitationInputObjectSchema).optional()
}).strict();
export const InvitationUncheckedCreateWithoutAuthuserInputObjectSchema: z.ZodType<Prisma.InvitationUncheckedCreateWithoutAuthuserInput> = makeSchema() as unknown as z.ZodType<Prisma.InvitationUncheckedCreateWithoutAuthuserInput>;
export const InvitationUncheckedCreateWithoutAuthuserInputObjectZodSchema = makeSchema();
