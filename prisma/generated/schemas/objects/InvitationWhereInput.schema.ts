import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { OrganizationScalarRelationFilterObjectSchema as OrganizationScalarRelationFilterObjectSchema } from './OrganizationScalarRelationFilter.schema';
import { OrganizationWhereInputObjectSchema as OrganizationWhereInputObjectSchema } from './OrganizationWhereInput.schema';
import { AuthUserScalarRelationFilterObjectSchema as AuthUserScalarRelationFilterObjectSchema } from './AuthUserScalarRelationFilter.schema';
import { AuthUserWhereInputObjectSchema as AuthUserWhereInputObjectSchema } from './AuthUserWhereInput.schema';
import { LabStaffInvitationIntentNullableScalarRelationFilterObjectSchema as LabStaffInvitationIntentNullableScalarRelationFilterObjectSchema } from './LabStaffInvitationIntentNullableScalarRelationFilter.schema';
import { LabStaffInvitationIntentWhereInputObjectSchema as LabStaffInvitationIntentWhereInputObjectSchema } from './LabStaffInvitationIntentWhereInput.schema'

const invitationwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => InvitationWhereInputObjectSchema), z.lazy(() => InvitationWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => InvitationWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => InvitationWhereInputObjectSchema), z.lazy(() => InvitationWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  organizationId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  email: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  role: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  status: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  expiresAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  inviterId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  organization: z.union([z.lazy(() => OrganizationScalarRelationFilterObjectSchema), z.lazy(() => OrganizationWhereInputObjectSchema)]).optional(),
  authuser: z.union([z.lazy(() => AuthUserScalarRelationFilterObjectSchema), z.lazy(() => AuthUserWhereInputObjectSchema)]).optional(),
  labStaffIntent: z.union([z.lazy(() => LabStaffInvitationIntentNullableScalarRelationFilterObjectSchema), z.lazy(() => LabStaffInvitationIntentWhereInputObjectSchema)]).optional()
}).strict();
export const InvitationWhereInputObjectSchema: z.ZodType<Prisma.InvitationWhereInput> = invitationwhereinputSchema as unknown as z.ZodType<Prisma.InvitationWhereInput>;
export const InvitationWhereInputObjectZodSchema = invitationwhereinputSchema;
