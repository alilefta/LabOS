import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { PatientGenderSchema } from '../enums/PatientGender.schema'

const nestedenumpatientgendernullablefilterSchema = z.object({
  equals: PatientGenderSchema.optional().nullable(),
  in: PatientGenderSchema.array().optional().nullable(),
  notIn: PatientGenderSchema.array().optional().nullable(),
  not: z.union([PatientGenderSchema, z.lazy(() => NestedEnumPatientGenderNullableFilterObjectSchema)]).optional().nullable()
}).strict();
export const NestedEnumPatientGenderNullableFilterObjectSchema: z.ZodType<Prisma.NestedEnumPatientGenderNullableFilter> = nestedenumpatientgendernullablefilterSchema as unknown as z.ZodType<Prisma.NestedEnumPatientGenderNullableFilter>;
export const NestedEnumPatientGenderNullableFilterObjectZodSchema = nestedenumpatientgendernullablefilterSchema;
