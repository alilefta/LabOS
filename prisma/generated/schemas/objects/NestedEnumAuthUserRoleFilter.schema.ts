import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { AuthUserRoleSchema } from '../enums/AuthUserRole.schema'

const nestedenumauthuserrolefilterSchema = z.object({
  equals: AuthUserRoleSchema.optional(),
  in: AuthUserRoleSchema.array().optional(),
  notIn: AuthUserRoleSchema.array().optional(),
  not: z.union([AuthUserRoleSchema, z.lazy(() => NestedEnumAuthUserRoleFilterObjectSchema)]).optional()
}).strict();
export const NestedEnumAuthUserRoleFilterObjectSchema: z.ZodType<Prisma.NestedEnumAuthUserRoleFilter> = nestedenumauthuserrolefilterSchema as unknown as z.ZodType<Prisma.NestedEnumAuthUserRoleFilter>;
export const NestedEnumAuthUserRoleFilterObjectZodSchema = nestedenumauthuserrolefilterSchema;
