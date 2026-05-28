import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema as StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { EnumLabRoleWithAggregatesFilterObjectSchema as EnumLabRoleWithAggregatesFilterObjectSchema } from './EnumLabRoleWithAggregatesFilter.schema';
import { LabRoleSchema } from '../enums/LabRole.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const labinvitationscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => LabInvitationScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => LabInvitationScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => LabInvitationScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => LabInvitationScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => LabInvitationScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  token: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  email: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  labId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  labStaffId: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  roleToGrant: z.union([z.lazy(() => EnumLabRoleWithAggregatesFilterObjectSchema), LabRoleSchema]).optional(),
  expiresAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const LabInvitationScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.LabInvitationScalarWhereWithAggregatesInput> = labinvitationscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.LabInvitationScalarWhereWithAggregatesInput>;
export const LabInvitationScalarWhereWithAggregatesInputObjectZodSchema = labinvitationscalarwherewithaggregatesinputSchema;
