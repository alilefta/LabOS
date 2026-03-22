import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SuperUserRoleSchema } from '../enums/SuperUserRole.schema';
import { NestedEnumSuperUserRoleFilterObjectSchema as NestedEnumSuperUserRoleFilterObjectSchema } from './NestedEnumSuperUserRoleFilter.schema'

const makeSchema = () => z.object({
  equals: SuperUserRoleSchema.optional(),
  in: SuperUserRoleSchema.array().optional(),
  notIn: SuperUserRoleSchema.array().optional(),
  not: z.union([SuperUserRoleSchema, z.lazy(() => NestedEnumSuperUserRoleFilterObjectSchema)]).optional()
}).strict();
export const EnumSuperUserRoleFilterObjectSchema: z.ZodType<Prisma.EnumSuperUserRoleFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumSuperUserRoleFilter>;
export const EnumSuperUserRoleFilterObjectZodSchema = makeSchema();
