import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { BoolWithAggregatesFilterObjectSchema as BoolWithAggregatesFilterObjectSchema } from './BoolWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema as StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema';
import { EnumAuthUserRoleWithAggregatesFilterObjectSchema as EnumAuthUserRoleWithAggregatesFilterObjectSchema } from './EnumAuthUserRoleWithAggregatesFilter.schema';
import { AuthUserRoleSchema } from '../enums/AuthUserRole.schema'

const authuserscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => AuthUserScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => AuthUserScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => AuthUserScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => AuthUserScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => AuthUserScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  email: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  emailVerified: z.union([z.lazy(() => BoolWithAggregatesFilterObjectSchema), z.boolean()]).optional(),
  image: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  role: z.union([z.lazy(() => EnumAuthUserRoleWithAggregatesFilterObjectSchema), AuthUserRoleSchema]).optional(),
  labId: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable()
}).strict();
export const AuthUserScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.AuthUserScalarWhereWithAggregatesInput> = authuserscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.AuthUserScalarWhereWithAggregatesInput>;
export const AuthUserScalarWhereWithAggregatesInputObjectZodSchema = authuserscalarwherewithaggregatesinputSchema;
