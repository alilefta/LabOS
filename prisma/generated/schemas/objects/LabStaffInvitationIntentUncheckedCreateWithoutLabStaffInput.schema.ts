import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  invitationId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const LabStaffInvitationIntentUncheckedCreateWithoutLabStaffInputObjectSchema: z.ZodType<Prisma.LabStaffInvitationIntentUncheckedCreateWithoutLabStaffInput> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffInvitationIntentUncheckedCreateWithoutLabStaffInput>;
export const LabStaffInvitationIntentUncheckedCreateWithoutLabStaffInputObjectZodSchema = makeSchema();
