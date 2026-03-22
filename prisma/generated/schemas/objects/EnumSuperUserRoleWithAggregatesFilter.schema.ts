import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SuperUserRoleSchema } from '../enums/SuperUserRole.schema';
import { NestedEnumSuperUserRoleWithAggregatesFilterObjectSchema as NestedEnumSuperUserRoleWithAggregatesFilterObjectSchema } from './NestedEnumSuperUserRoleWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumSuperUserRoleFilterObjectSchema as NestedEnumSuperUserRoleFilterObjectSchema } from './NestedEnumSuperUserRoleFilter.schema'

const makeSchema = () => z.object({
  equals: SuperUserRoleSchema.optional(),
  in: SuperUserRoleSchema.array().optional(),
  notIn: SuperUserRoleSchema.array().optional(),
  not: z.union([SuperUserRoleSchema, z.lazy(() => NestedEnumSuperUserRoleWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumSuperUserRoleFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumSuperUserRoleFilterObjectSchema).optional()
}).strict();
export const EnumSuperUserRoleWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumSuperUserRoleWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumSuperUserRoleWithAggregatesFilter>;
export const EnumSuperUserRoleWithAggregatesFilterObjectZodSchema = makeSchema();
