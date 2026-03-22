import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabRoleSchema } from '../enums/LabRole.schema'

const nestedenumlabrolefilterSchema = z.object({
  equals: LabRoleSchema.optional(),
  in: LabRoleSchema.array().optional(),
  notIn: LabRoleSchema.array().optional(),
  not: z.union([LabRoleSchema, z.lazy(() => NestedEnumLabRoleFilterObjectSchema)]).optional()
}).strict();
export const NestedEnumLabRoleFilterObjectSchema: z.ZodType<Prisma.NestedEnumLabRoleFilter> = nestedenumlabrolefilterSchema as unknown as z.ZodType<Prisma.NestedEnumLabRoleFilter>;
export const NestedEnumLabRoleFilterObjectZodSchema = nestedenumlabrolefilterSchema;
