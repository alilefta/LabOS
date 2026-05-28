import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabRoleSchema } from '../enums/LabRole.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  token: z.string().optional(),
  email: z.string(),
  labStaffId: z.string().optional().nullable(),
  roleToGrant: LabRoleSchema.optional(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date().optional()
}).strict();
export const LabInvitationUncheckedCreateWithoutLabInputObjectSchema: z.ZodType<Prisma.LabInvitationUncheckedCreateWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.LabInvitationUncheckedCreateWithoutLabInput>;
export const LabInvitationUncheckedCreateWithoutLabInputObjectZodSchema = makeSchema();
