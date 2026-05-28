import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabRoleSchema } from '../enums/LabRole.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  token: z.string().optional(),
  email: z.string(),
  labId: z.string(),
  roleToGrant: LabRoleSchema.optional(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date().optional()
}).strict();
export const LabInvitationUncheckedCreateWithoutLabStaffInputObjectSchema: z.ZodType<Prisma.LabInvitationUncheckedCreateWithoutLabStaffInput> = makeSchema() as unknown as z.ZodType<Prisma.LabInvitationUncheckedCreateWithoutLabStaffInput>;
export const LabInvitationUncheckedCreateWithoutLabStaffInputObjectZodSchema = makeSchema();
