import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StaffRoleCategorySchema } from '../enums/StaffRoleCategory.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumStaffRoleCategoryFilterObjectSchema as NestedEnumStaffRoleCategoryFilterObjectSchema } from './NestedEnumStaffRoleCategoryFilter.schema'

const nestedenumstaffrolecategorywithaggregatesfilterSchema = z.object({
  equals: StaffRoleCategorySchema.optional(),
  in: StaffRoleCategorySchema.array().optional(),
  notIn: StaffRoleCategorySchema.array().optional(),
  not: z.union([StaffRoleCategorySchema, z.lazy(() => NestedEnumStaffRoleCategoryWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumStaffRoleCategoryFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumStaffRoleCategoryFilterObjectSchema).optional()
}).strict();
export const NestedEnumStaffRoleCategoryWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumStaffRoleCategoryWithAggregatesFilter> = nestedenumstaffrolecategorywithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedEnumStaffRoleCategoryWithAggregatesFilter>;
export const NestedEnumStaffRoleCategoryWithAggregatesFilterObjectZodSchema = nestedenumstaffrolecategorywithaggregatesfilterSchema;
