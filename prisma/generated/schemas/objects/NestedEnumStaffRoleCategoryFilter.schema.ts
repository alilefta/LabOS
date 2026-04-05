import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StaffRoleCategorySchema } from '../enums/StaffRoleCategory.schema'

const nestedenumstaffrolecategoryfilterSchema = z.object({
  equals: StaffRoleCategorySchema.optional(),
  in: StaffRoleCategorySchema.array().optional(),
  notIn: StaffRoleCategorySchema.array().optional(),
  not: z.union([StaffRoleCategorySchema, z.lazy(() => NestedEnumStaffRoleCategoryFilterObjectSchema)]).optional()
}).strict();
export const NestedEnumStaffRoleCategoryFilterObjectSchema: z.ZodType<Prisma.NestedEnumStaffRoleCategoryFilter> = nestedenumstaffrolecategoryfilterSchema as unknown as z.ZodType<Prisma.NestedEnumStaffRoleCategoryFilter>;
export const NestedEnumStaffRoleCategoryFilterObjectZodSchema = nestedenumstaffrolecategoryfilterSchema;
