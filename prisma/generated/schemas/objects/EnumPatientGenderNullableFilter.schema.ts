import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { PatientGenderSchema } from '../enums/PatientGender.schema';
import { NestedEnumPatientGenderNullableFilterObjectSchema as NestedEnumPatientGenderNullableFilterObjectSchema } from './NestedEnumPatientGenderNullableFilter.schema'

const makeSchema = () => z.object({
  equals: PatientGenderSchema.optional().nullable(),
  in: PatientGenderSchema.array().optional().nullable(),
  notIn: PatientGenderSchema.array().optional().nullable(),
  not: z.union([PatientGenderSchema, z.lazy(() => NestedEnumPatientGenderNullableFilterObjectSchema)]).optional().nullable()
}).strict();
export const EnumPatientGenderNullableFilterObjectSchema: z.ZodType<Prisma.EnumPatientGenderNullableFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumPatientGenderNullableFilter>;
export const EnumPatientGenderNullableFilterObjectZodSchema = makeSchema();
