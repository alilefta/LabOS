import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SuperUserRoleSchema } from '../enums/SuperUserRole.schema'

const nestedenumsuperuserrolefilterSchema = z.object({
  equals: SuperUserRoleSchema.optional(),
  in: SuperUserRoleSchema.array().optional(),
  notIn: SuperUserRoleSchema.array().optional(),
  not: z.union([SuperUserRoleSchema, z.lazy(() => NestedEnumSuperUserRoleFilterObjectSchema)]).optional()
}).strict();
export const NestedEnumSuperUserRoleFilterObjectSchema: z.ZodType<Prisma.NestedEnumSuperUserRoleFilter> = nestedenumsuperuserrolefilterSchema as unknown as z.ZodType<Prisma.NestedEnumSuperUserRoleFilter>;
export const NestedEnumSuperUserRoleFilterObjectZodSchema = nestedenumsuperuserrolefilterSchema;
