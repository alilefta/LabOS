import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { EnumLabRoleFilterObjectSchema as EnumLabRoleFilterObjectSchema } from './EnumLabRoleFilter.schema';
import { LabRoleSchema } from '../enums/LabRole.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { LabScalarRelationFilterObjectSchema as LabScalarRelationFilterObjectSchema } from './LabScalarRelationFilter.schema';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema';
import { LabStaffNullableScalarRelationFilterObjectSchema as LabStaffNullableScalarRelationFilterObjectSchema } from './LabStaffNullableScalarRelationFilter.schema';
import { LabStaffWhereInputObjectSchema as LabStaffWhereInputObjectSchema } from './LabStaffWhereInput.schema'

const labinvitationwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => LabInvitationWhereInputObjectSchema), z.lazy(() => LabInvitationWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => LabInvitationWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => LabInvitationWhereInputObjectSchema), z.lazy(() => LabInvitationWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  token: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  email: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  labId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  labStaffId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  roleToGrant: z.union([z.lazy(() => EnumLabRoleFilterObjectSchema), LabRoleSchema]).optional(),
  expiresAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  lab: z.union([z.lazy(() => LabScalarRelationFilterObjectSchema), z.lazy(() => LabWhereInputObjectSchema)]).optional(),
  labStaff: z.union([z.lazy(() => LabStaffNullableScalarRelationFilterObjectSchema), z.lazy(() => LabStaffWhereInputObjectSchema)]).optional()
}).strict();
export const LabInvitationWhereInputObjectSchema: z.ZodType<Prisma.LabInvitationWhereInput> = labinvitationwhereinputSchema as unknown as z.ZodType<Prisma.LabInvitationWhereInput>;
export const LabInvitationWhereInputObjectZodSchema = labinvitationwhereinputSchema;
