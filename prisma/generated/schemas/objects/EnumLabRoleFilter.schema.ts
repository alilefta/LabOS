import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabRoleSchema } from '../enums/LabRole.schema';
import { NestedEnumLabRoleFilterObjectSchema as NestedEnumLabRoleFilterObjectSchema } from './NestedEnumLabRoleFilter.schema'

const makeSchema = () => z.object({
  equals: LabRoleSchema.optional(),
  in: LabRoleSchema.array().optional(),
  notIn: LabRoleSchema.array().optional(),
  not: z.union([LabRoleSchema, z.lazy(() => NestedEnumLabRoleFilterObjectSchema)]).optional()
}).strict();
export const EnumLabRoleFilterObjectSchema: z.ZodType<Prisma.EnumLabRoleFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumLabRoleFilter>;
export const EnumLabRoleFilterObjectZodSchema = makeSchema();
