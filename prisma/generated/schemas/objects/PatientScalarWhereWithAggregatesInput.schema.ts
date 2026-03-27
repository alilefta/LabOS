import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema as StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { IntNullableWithAggregatesFilterObjectSchema as IntNullableWithAggregatesFilterObjectSchema } from './IntNullableWithAggregatesFilter.schema';
import { EnumPatientGenderNullableWithAggregatesFilterObjectSchema as EnumPatientGenderNullableWithAggregatesFilterObjectSchema } from './EnumPatientGenderNullableWithAggregatesFilter.schema';
import { PatientGenderSchema } from '../enums/PatientGender.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const patientscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => PatientScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => PatientScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => PatientScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => PatientScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => PatientScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  description: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  notes: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  age: z.union([z.lazy(() => IntNullableWithAggregatesFilterObjectSchema), z.number().int()]).optional().nullable(),
  gender: z.union([z.lazy(() => EnumPatientGenderNullableWithAggregatesFilterObjectSchema), PatientGenderSchema]).optional().nullable(),
  labId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const PatientScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.PatientScalarWhereWithAggregatesInput> = patientscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.PatientScalarWhereWithAggregatesInput>;
export const PatientScalarWhereWithAggregatesInputObjectZodSchema = patientscalarwherewithaggregatesinputSchema;
