import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabRoleSchema } from '../enums/LabRole.schema';
import { NestedEnumLabRoleWithAggregatesFilterObjectSchema as NestedEnumLabRoleWithAggregatesFilterObjectSchema } from './NestedEnumLabRoleWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumLabRoleFilterObjectSchema as NestedEnumLabRoleFilterObjectSchema } from './NestedEnumLabRoleFilter.schema'

const makeSchema = () => z.object({
  equals: LabRoleSchema.optional(),
  in: LabRoleSchema.array().optional(),
  notIn: LabRoleSchema.array().optional(),
  not: z.union([LabRoleSchema, z.lazy(() => NestedEnumLabRoleWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumLabRoleFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumLabRoleFilterObjectSchema).optional()
}).strict();
export const EnumLabRoleWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumLabRoleWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumLabRoleWithAggregatesFilter>;
export const EnumLabRoleWithAggregatesFilterObjectZodSchema = makeSchema();
