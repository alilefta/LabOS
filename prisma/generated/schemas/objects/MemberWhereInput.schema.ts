import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { OrganizationScalarRelationFilterObjectSchema as OrganizationScalarRelationFilterObjectSchema } from './OrganizationScalarRelationFilter.schema';
import { OrganizationWhereInputObjectSchema as OrganizationWhereInputObjectSchema } from './OrganizationWhereInput.schema';
import { AuthUserScalarRelationFilterObjectSchema as AuthUserScalarRelationFilterObjectSchema } from './AuthUserScalarRelationFilter.schema';
import { AuthUserWhereInputObjectSchema as AuthUserWhereInputObjectSchema } from './AuthUserWhereInput.schema';
import { LabStaffNullableScalarRelationFilterObjectSchema as LabStaffNullableScalarRelationFilterObjectSchema } from './LabStaffNullableScalarRelationFilter.schema';
import { LabStaffWhereInputObjectSchema as LabStaffWhereInputObjectSchema } from './LabStaffWhereInput.schema'

const memberwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => MemberWhereInputObjectSchema), z.lazy(() => MemberWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => MemberWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => MemberWhereInputObjectSchema), z.lazy(() => MemberWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  organizationId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  role: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  organization: z.union([z.lazy(() => OrganizationScalarRelationFilterObjectSchema), z.lazy(() => OrganizationWhereInputObjectSchema)]).optional(),
  authuser: z.union([z.lazy(() => AuthUserScalarRelationFilterObjectSchema), z.lazy(() => AuthUserWhereInputObjectSchema)]).optional(),
  labStaff: z.union([z.lazy(() => LabStaffNullableScalarRelationFilterObjectSchema), z.lazy(() => LabStaffWhereInputObjectSchema)]).optional()
}).strict();
export const MemberWhereInputObjectSchema: z.ZodType<Prisma.MemberWhereInput> = memberwhereinputSchema as unknown as z.ZodType<Prisma.MemberWhereInput>;
export const MemberWhereInputObjectZodSchema = memberwhereinputSchema;
