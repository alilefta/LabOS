import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { BoolFilterObjectSchema as BoolFilterObjectSchema } from './BoolFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { EnumAuthUserRoleFilterObjectSchema as EnumAuthUserRoleFilterObjectSchema } from './EnumAuthUserRoleFilter.schema';
import { AuthUserRoleSchema } from '../enums/AuthUserRole.schema';
import { BoolNullableFilterObjectSchema as BoolNullableFilterObjectSchema } from './BoolNullableFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { SessionListRelationFilterObjectSchema as SessionListRelationFilterObjectSchema } from './SessionListRelationFilter.schema';
import { AccountListRelationFilterObjectSchema as AccountListRelationFilterObjectSchema } from './AccountListRelationFilter.schema';
import { MemberListRelationFilterObjectSchema as MemberListRelationFilterObjectSchema } from './MemberListRelationFilter.schema';
import { InvitationListRelationFilterObjectSchema as InvitationListRelationFilterObjectSchema } from './InvitationListRelationFilter.schema';
import { LabUserNullableScalarRelationFilterObjectSchema as LabUserNullableScalarRelationFilterObjectSchema } from './LabUserNullableScalarRelationFilter.schema';
import { LabUserWhereInputObjectSchema as LabUserWhereInputObjectSchema } from './LabUserWhereInput.schema';
import { SuperUserNullableScalarRelationFilterObjectSchema as SuperUserNullableScalarRelationFilterObjectSchema } from './SuperUserNullableScalarRelationFilter.schema';
import { SuperUserWhereInputObjectSchema as SuperUserWhereInputObjectSchema } from './SuperUserWhereInput.schema'

const authuserwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => AuthUserWhereInputObjectSchema), z.lazy(() => AuthUserWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => AuthUserWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => AuthUserWhereInputObjectSchema), z.lazy(() => AuthUserWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  email: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  emailVerified: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  image: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  role: z.union([z.lazy(() => EnumAuthUserRoleFilterObjectSchema), AuthUserRoleSchema]).optional(),
  labId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  banned: z.union([z.lazy(() => BoolNullableFilterObjectSchema), z.boolean()]).optional().nullable(),
  banReason: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  banExpires: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  sessions: z.lazy(() => SessionListRelationFilterObjectSchema).optional(),
  accounts: z.lazy(() => AccountListRelationFilterObjectSchema).optional(),
  members: z.lazy(() => MemberListRelationFilterObjectSchema).optional(),
  invitations: z.lazy(() => InvitationListRelationFilterObjectSchema).optional(),
  labUser: z.union([z.lazy(() => LabUserNullableScalarRelationFilterObjectSchema), z.lazy(() => LabUserWhereInputObjectSchema)]).optional(),
  superUser: z.union([z.lazy(() => SuperUserNullableScalarRelationFilterObjectSchema), z.lazy(() => SuperUserWhereInputObjectSchema)]).optional()
}).strict();
export const AuthUserWhereInputObjectSchema: z.ZodType<Prisma.AuthUserWhereInput> = authuserwhereinputSchema as unknown as z.ZodType<Prisma.AuthUserWhereInput>;
export const AuthUserWhereInputObjectZodSchema = authuserwhereinputSchema;
