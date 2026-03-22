import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { EnumLabRoleFilterObjectSchema as EnumLabRoleFilterObjectSchema } from './EnumLabRoleFilter.schema';
import { LabRoleSchema } from '../enums/LabRole.schema';
import { BoolFilterObjectSchema as BoolFilterObjectSchema } from './BoolFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const labuserscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => LabUserScalarWhereInputObjectSchema), z.lazy(() => LabUserScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => LabUserScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => LabUserScalarWhereInputObjectSchema), z.lazy(() => LabUserScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  city: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  zipcode: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  address1: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  address2: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  avatarUrl: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  secondaryEmail: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  phoneNumber: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  role: z.union([z.lazy(() => EnumLabRoleFilterObjectSchema), LabRoleSchema]).optional(),
  authUserId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  labId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  isActive: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  lastTimeActive: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const LabUserScalarWhereInputObjectSchema: z.ZodType<Prisma.LabUserScalarWhereInput> = labuserscalarwhereinputSchema as unknown as z.ZodType<Prisma.LabUserScalarWhereInput>;
export const LabUserScalarWhereInputObjectZodSchema = labuserscalarwhereinputSchema;
