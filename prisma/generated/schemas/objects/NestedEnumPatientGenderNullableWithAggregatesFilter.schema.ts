import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { PatientGenderSchema } from '../enums/PatientGender.schema';
import { NestedIntNullableFilterObjectSchema as NestedIntNullableFilterObjectSchema } from './NestedIntNullableFilter.schema';
import { NestedEnumPatientGenderNullableFilterObjectSchema as NestedEnumPatientGenderNullableFilterObjectSchema } from './NestedEnumPatientGenderNullableFilter.schema'

const nestedenumpatientgendernullablewithaggregatesfilterSchema = z.object({
  equals: PatientGenderSchema.optional().nullable(),
  in: PatientGenderSchema.array().optional().nullable(),
  notIn: PatientGenderSchema.array().optional().nullable(),
  not: z.union([PatientGenderSchema, z.lazy(() => NestedEnumPatientGenderNullableWithAggregatesFilterObjectSchema)]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumPatientGenderNullableFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumPatientGenderNullableFilterObjectSchema).optional()
}).strict();
export const NestedEnumPatientGenderNullableWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumPatientGenderNullableWithAggregatesFilter> = nestedenumpatientgendernullablewithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedEnumPatientGenderNullableWithAggregatesFilter>;
export const NestedEnumPatientGenderNullableWithAggregatesFilterObjectZodSchema = nestedenumpatientgendernullablewithaggregatesfilterSchema;
