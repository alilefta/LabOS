import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ClinicTypeSchema } from '../enums/ClinicType.schema';
import { NestedEnumClinicTypeFilterObjectSchema as NestedEnumClinicTypeFilterObjectSchema } from './NestedEnumClinicTypeFilter.schema'

const makeSchema = () => z.object({
  equals: ClinicTypeSchema.optional(),
  in: ClinicTypeSchema.array().optional(),
  notIn: ClinicTypeSchema.array().optional(),
  not: z.union([ClinicTypeSchema, z.lazy(() => NestedEnumClinicTypeFilterObjectSchema)]).optional()
}).strict();
export const EnumClinicTypeFilterObjectSchema: z.ZodType<Prisma.EnumClinicTypeFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumClinicTypeFilter>;
export const EnumClinicTypeFilterObjectZodSchema = makeSchema();
