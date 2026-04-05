import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StaffRoleCategorySchema } from '../enums/StaffRoleCategory.schema';
import { NestedEnumStaffRoleCategoryWithAggregatesFilterObjectSchema as NestedEnumStaffRoleCategoryWithAggregatesFilterObjectSchema } from './NestedEnumStaffRoleCategoryWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumStaffRoleCategoryFilterObjectSchema as NestedEnumStaffRoleCategoryFilterObjectSchema } from './NestedEnumStaffRoleCategoryFilter.schema'

const makeSchema = () => z.object({
  equals: StaffRoleCategorySchema.optional(),
  in: StaffRoleCategorySchema.array().optional(),
  notIn: StaffRoleCategorySchema.array().optional(),
  not: z.union([StaffRoleCategorySchema, z.lazy(() => NestedEnumStaffRoleCategoryWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumStaffRoleCategoryFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumStaffRoleCategoryFilterObjectSchema).optional()
}).strict();
export const EnumStaffRoleCategoryWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumStaffRoleCategoryWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumStaffRoleCategoryWithAggregatesFilter>;
export const EnumStaffRoleCategoryWithAggregatesFilterObjectZodSchema = makeSchema();
