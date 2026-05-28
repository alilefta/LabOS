import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabRoleSchema } from '../enums/LabRole.schema';
import { LabStaffCreateNestedOneWithoutLabInvitationInputObjectSchema as LabStaffCreateNestedOneWithoutLabInvitationInputObjectSchema } from './LabStaffCreateNestedOneWithoutLabInvitationInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  token: z.string().optional(),
  email: z.string(),
  roleToGrant: LabRoleSchema.optional(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  labStaff: z.lazy(() => LabStaffCreateNestedOneWithoutLabInvitationInputObjectSchema).optional()
}).strict();
export const LabInvitationCreateWithoutLabInputObjectSchema: z.ZodType<Prisma.LabInvitationCreateWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.LabInvitationCreateWithoutLabInput>;
export const LabInvitationCreateWithoutLabInputObjectZodSchema = makeSchema();
