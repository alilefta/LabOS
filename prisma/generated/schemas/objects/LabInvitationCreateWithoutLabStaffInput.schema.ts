import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabRoleSchema } from '../enums/LabRole.schema';
import { LabCreateNestedOneWithoutInvitationsInputObjectSchema as LabCreateNestedOneWithoutInvitationsInputObjectSchema } from './LabCreateNestedOneWithoutInvitationsInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  token: z.string().optional(),
  email: z.string(),
  roleToGrant: LabRoleSchema.optional(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  lab: z.lazy(() => LabCreateNestedOneWithoutInvitationsInputObjectSchema)
}).strict();
export const LabInvitationCreateWithoutLabStaffInputObjectSchema: z.ZodType<Prisma.LabInvitationCreateWithoutLabStaffInput> = makeSchema() as unknown as z.ZodType<Prisma.LabInvitationCreateWithoutLabStaffInput>;
export const LabInvitationCreateWithoutLabStaffInputObjectZodSchema = makeSchema();
