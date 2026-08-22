import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  labId: z.string(),
  labStaffId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const LabStaffInvitationIntentUncheckedCreateWithoutInvitationInputObjectSchema: z.ZodType<Prisma.LabStaffInvitationIntentUncheckedCreateWithoutInvitationInput> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffInvitationIntentUncheckedCreateWithoutInvitationInput>;
export const LabStaffInvitationIntentUncheckedCreateWithoutInvitationInputObjectZodSchema = makeSchema();
