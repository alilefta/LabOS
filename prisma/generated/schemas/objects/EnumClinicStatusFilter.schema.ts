import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ClinicStatusSchema } from '../enums/ClinicStatus.schema';
import { NestedEnumClinicStatusFilterObjectSchema as NestedEnumClinicStatusFilterObjectSchema } from './NestedEnumClinicStatusFilter.schema'

const makeSchema = () => z.object({
  equals: ClinicStatusSchema.optional(),
  in: ClinicStatusSchema.array().optional(),
  notIn: ClinicStatusSchema.array().optional(),
  not: z.union([ClinicStatusSchema, z.lazy(() => NestedEnumClinicStatusFilterObjectSchema)]).optional()
}).strict();
export const EnumClinicStatusFilterObjectSchema: z.ZodType<Prisma.EnumClinicStatusFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumClinicStatusFilter>;
export const EnumClinicStatusFilterObjectZodSchema = makeSchema();
