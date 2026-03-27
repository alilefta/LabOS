import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { IntNullableFilterObjectSchema as IntNullableFilterObjectSchema } from './IntNullableFilter.schema';
import { EnumPatientGenderNullableFilterObjectSchema as EnumPatientGenderNullableFilterObjectSchema } from './EnumPatientGenderNullableFilter.schema';
import { PatientGenderSchema } from '../enums/PatientGender.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { CaseListRelationFilterObjectSchema as CaseListRelationFilterObjectSchema } from './CaseListRelationFilter.schema';
import { LabScalarRelationFilterObjectSchema as LabScalarRelationFilterObjectSchema } from './LabScalarRelationFilter.schema';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema'

const patientwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => PatientWhereInputObjectSchema), z.lazy(() => PatientWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => PatientWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => PatientWhereInputObjectSchema), z.lazy(() => PatientWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  description: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  notes: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  age: z.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()]).optional().nullable(),
  gender: z.union([z.lazy(() => EnumPatientGenderNullableFilterObjectSchema), PatientGenderSchema]).optional().nullable(),
  labId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  cases: z.lazy(() => CaseListRelationFilterObjectSchema).optional(),
  lab: z.union([z.lazy(() => LabScalarRelationFilterObjectSchema), z.lazy(() => LabWhereInputObjectSchema)]).optional()
}).strict();
export const PatientWhereInputObjectSchema: z.ZodType<Prisma.PatientWhereInput> = patientwhereinputSchema as unknown as z.ZodType<Prisma.PatientWhereInput>;
export const PatientWhereInputObjectZodSchema = patientwhereinputSchema;
