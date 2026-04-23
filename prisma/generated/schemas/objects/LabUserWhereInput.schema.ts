import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { EnumLabRoleFilterObjectSchema as EnumLabRoleFilterObjectSchema } from './EnumLabRoleFilter.schema';
import { LabRoleSchema } from '../enums/LabRole.schema';
import { BoolFilterObjectSchema as BoolFilterObjectSchema } from './BoolFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { LabScalarRelationFilterObjectSchema as LabScalarRelationFilterObjectSchema } from './LabScalarRelationFilter.schema';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema';
import { AuthUserScalarRelationFilterObjectSchema as AuthUserScalarRelationFilterObjectSchema } from './AuthUserScalarRelationFilter.schema';
import { AuthUserWhereInputObjectSchema as AuthUserWhereInputObjectSchema } from './AuthUserWhereInput.schema';
import { LabStaffNullableScalarRelationFilterObjectSchema as LabStaffNullableScalarRelationFilterObjectSchema } from './LabStaffNullableScalarRelationFilter.schema';
import { LabStaffWhereInputObjectSchema as LabStaffWhereInputObjectSchema } from './LabStaffWhereInput.schema';
import { CaseActivityLogListRelationFilterObjectSchema as CaseActivityLogListRelationFilterObjectSchema } from './CaseActivityLogListRelationFilter.schema'

const labuserwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => LabUserWhereInputObjectSchema), z.lazy(() => LabUserWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => LabUserWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => LabUserWhereInputObjectSchema), z.lazy(() => LabUserWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  labId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  authUserId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  labStaffId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  role: z.union([z.lazy(() => EnumLabRoleFilterObjectSchema), LabRoleSchema]).optional(),
  isActive: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  lastTimeActive: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  lab: z.union([z.lazy(() => LabScalarRelationFilterObjectSchema), z.lazy(() => LabWhereInputObjectSchema)]).optional(),
  authUser: z.union([z.lazy(() => AuthUserScalarRelationFilterObjectSchema), z.lazy(() => AuthUserWhereInputObjectSchema)]).optional(),
  labStaff: z.union([z.lazy(() => LabStaffNullableScalarRelationFilterObjectSchema), z.lazy(() => LabStaffWhereInputObjectSchema)]).optional(),
  activityLogs: z.lazy(() => CaseActivityLogListRelationFilterObjectSchema).optional()
}).strict();
export const LabUserWhereInputObjectSchema: z.ZodType<Prisma.LabUserWhereInput> = labuserwhereinputSchema as unknown as z.ZodType<Prisma.LabUserWhereInput>;
export const LabUserWhereInputObjectZodSchema = labuserwhereinputSchema;
