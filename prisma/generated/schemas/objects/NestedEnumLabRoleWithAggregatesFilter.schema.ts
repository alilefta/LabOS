import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabRoleSchema } from '../enums/LabRole.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumLabRoleFilterObjectSchema as NestedEnumLabRoleFilterObjectSchema } from './NestedEnumLabRoleFilter.schema'

const nestedenumlabrolewithaggregatesfilterSchema = z.object({
  equals: LabRoleSchema.optional(),
  in: LabRoleSchema.array().optional(),
  notIn: LabRoleSchema.array().optional(),
  not: z.union([LabRoleSchema, z.lazy(() => NestedEnumLabRoleWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumLabRoleFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumLabRoleFilterObjectSchema).optional()
}).strict();
export const NestedEnumLabRoleWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumLabRoleWithAggregatesFilter> = nestedenumlabrolewithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedEnumLabRoleWithAggregatesFilter>;
export const NestedEnumLabRoleWithAggregatesFilterObjectZodSchema = nestedenumlabrolewithaggregatesfilterSchema;
