import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { AuthUserRoleSchema } from '../enums/AuthUserRole.schema';
import { NestedEnumAuthUserRoleFilterObjectSchema as NestedEnumAuthUserRoleFilterObjectSchema } from './NestedEnumAuthUserRoleFilter.schema'

const makeSchema = () => z.object({
  equals: AuthUserRoleSchema.optional(),
  in: AuthUserRoleSchema.array().optional(),
  notIn: AuthUserRoleSchema.array().optional(),
  not: z.union([AuthUserRoleSchema, z.lazy(() => NestedEnumAuthUserRoleFilterObjectSchema)]).optional()
}).strict();
export const EnumAuthUserRoleFilterObjectSchema: z.ZodType<Prisma.EnumAuthUserRoleFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumAuthUserRoleFilter>;
export const EnumAuthUserRoleFilterObjectZodSchema = makeSchema();
