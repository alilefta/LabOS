import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StaffRoleCategorySchema } from '../enums/StaffRoleCategory.schema';
import { NestedEnumStaffRoleCategoryFilterObjectSchema as NestedEnumStaffRoleCategoryFilterObjectSchema } from './NestedEnumStaffRoleCategoryFilter.schema'

const makeSchema = () => z.object({
  equals: StaffRoleCategorySchema.optional(),
  in: StaffRoleCategorySchema.array().optional(),
  notIn: StaffRoleCategorySchema.array().optional(),
  not: z.union([StaffRoleCategorySchema, z.lazy(() => NestedEnumStaffRoleCategoryFilterObjectSchema)]).optional()
}).strict();
export const EnumStaffRoleCategoryFilterObjectSchema: z.ZodType<Prisma.EnumStaffRoleCategoryFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumStaffRoleCategoryFilter>;
export const EnumStaffRoleCategoryFilterObjectZodSchema = makeSchema();
