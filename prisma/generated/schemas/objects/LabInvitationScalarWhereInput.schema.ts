import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { EnumLabRoleFilterObjectSchema as EnumLabRoleFilterObjectSchema } from './EnumLabRoleFilter.schema';
import { LabRoleSchema } from '../enums/LabRole.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const labinvitationscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => LabInvitationScalarWhereInputObjectSchema), z.lazy(() => LabInvitationScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => LabInvitationScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => LabInvitationScalarWhereInputObjectSchema), z.lazy(() => LabInvitationScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  token: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  email: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  labId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  labStaffId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  roleToGrant: z.union([z.lazy(() => EnumLabRoleFilterObjectSchema), LabRoleSchema]).optional(),
  expiresAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const LabInvitationScalarWhereInputObjectSchema: z.ZodType<Prisma.LabInvitationScalarWhereInput> = labinvitationscalarwhereinputSchema as unknown as z.ZodType<Prisma.LabInvitationScalarWhereInput>;
export const LabInvitationScalarWhereInputObjectZodSchema = labinvitationscalarwhereinputSchema;
