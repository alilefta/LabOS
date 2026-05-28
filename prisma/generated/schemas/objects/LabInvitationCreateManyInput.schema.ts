import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabRoleSchema } from '../enums/LabRole.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  token: z.string().optional(),
  email: z.string(),
  labId: z.string(),
  labStaffId: z.string().optional().nullable(),
  roleToGrant: LabRoleSchema.optional(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date().optional()
}).strict();
export const LabInvitationCreateManyInputObjectSchema: z.ZodType<Prisma.LabInvitationCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.LabInvitationCreateManyInput>;
export const LabInvitationCreateManyInputObjectZodSchema = makeSchema();
