import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { IntNullableFilterObjectSchema as IntNullableFilterObjectSchema } from './IntNullableFilter.schema';
import { EnumPatientGenderNullableFilterObjectSchema as EnumPatientGenderNullableFilterObjectSchema } from './EnumPatientGenderNullableFilter.schema';
import { PatientGenderSchema } from '../enums/PatientGender.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const patientscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => PatientScalarWhereInputObjectSchema), z.lazy(() => PatientScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => PatientScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => PatientScalarWhereInputObjectSchema), z.lazy(() => PatientScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  description: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  notes: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  age: z.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()]).optional().nullable(),
  gender: z.union([z.lazy(() => EnumPatientGenderNullableFilterObjectSchema), PatientGenderSchema]).optional().nullable(),
  labId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const PatientScalarWhereInputObjectSchema: z.ZodType<Prisma.PatientScalarWhereInput> = patientscalarwhereinputSchema as unknown as z.ZodType<Prisma.PatientScalarWhereInput>;
export const PatientScalarWhereInputObjectZodSchema = patientscalarwhereinputSchema;
