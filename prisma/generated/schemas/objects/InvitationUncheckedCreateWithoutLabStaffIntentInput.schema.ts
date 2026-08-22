import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.string(),
  organizationId: z.string(),
  email: z.string(),
  role: z.string().optional().nullable(),
  status: z.string().optional(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  inviterId: z.string()
}).strict();
export const InvitationUncheckedCreateWithoutLabStaffIntentInputObjectSchema: z.ZodType<Prisma.InvitationUncheckedCreateWithoutLabStaffIntentInput> = makeSchema() as unknown as z.ZodType<Prisma.InvitationUncheckedCreateWithoutLabStaffIntentInput>;
export const InvitationUncheckedCreateWithoutLabStaffIntentInputObjectZodSchema = makeSchema();
