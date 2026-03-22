import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SuperUserRoleSchema } from '../enums/SuperUserRole.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumSuperUserRoleFilterObjectSchema as NestedEnumSuperUserRoleFilterObjectSchema } from './NestedEnumSuperUserRoleFilter.schema'

const nestedenumsuperuserrolewithaggregatesfilterSchema = z.object({
  equals: SuperUserRoleSchema.optional(),
  in: SuperUserRoleSchema.array().optional(),
  notIn: SuperUserRoleSchema.array().optional(),
  not: z.union([SuperUserRoleSchema, z.lazy(() => NestedEnumSuperUserRoleWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumSuperUserRoleFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumSuperUserRoleFilterObjectSchema).optional()
}).strict();
export const NestedEnumSuperUserRoleWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumSuperUserRoleWithAggregatesFilter> = nestedenumsuperuserrolewithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedEnumSuperUserRoleWithAggregatesFilter>;
export const NestedEnumSuperUserRoleWithAggregatesFilterObjectZodSchema = nestedenumsuperuserrolewithaggregatesfilterSchema;
