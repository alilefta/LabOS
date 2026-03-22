import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { AuthUserRoleSchema } from '../enums/AuthUserRole.schema';
import { NestedEnumAuthUserRoleWithAggregatesFilterObjectSchema as NestedEnumAuthUserRoleWithAggregatesFilterObjectSchema } from './NestedEnumAuthUserRoleWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumAuthUserRoleFilterObjectSchema as NestedEnumAuthUserRoleFilterObjectSchema } from './NestedEnumAuthUserRoleFilter.schema'

const makeSchema = () => z.object({
  equals: AuthUserRoleSchema.optional(),
  in: AuthUserRoleSchema.array().optional(),
  notIn: AuthUserRoleSchema.array().optional(),
  not: z.union([AuthUserRoleSchema, z.lazy(() => NestedEnumAuthUserRoleWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumAuthUserRoleFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumAuthUserRoleFilterObjectSchema).optional()
}).strict();
export const EnumAuthUserRoleWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumAuthUserRoleWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumAuthUserRoleWithAggregatesFilter>;
export const EnumAuthUserRoleWithAggregatesFilterObjectZodSchema = makeSchema();
