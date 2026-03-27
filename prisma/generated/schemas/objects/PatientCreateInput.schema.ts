import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { PatientGenderSchema } from '../enums/PatientGender.schema';
import { CaseCreateNestedManyWithoutPatientInputObjectSchema as CaseCreateNestedManyWithoutPatientInputObjectSchema } from './CaseCreateNestedManyWithoutPatientInput.schema';
import { LabCreateNestedOneWithoutPatientsInputObjectSchema as LabCreateNestedOneWithoutPatientsInputObjectSchema } from './LabCreateNestedOneWithoutPatientsInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  age: z.number().int().optional().nullable(),
  gender: PatientGenderSchema.optional().nullable(),
  createdAt: z.coerce.date().optional(),
  cases: z.lazy(() => CaseCreateNestedManyWithoutPatientInputObjectSchema).optional(),
  lab: z.lazy(() => LabCreateNestedOneWithoutPatientsInputObjectSchema)
}).strict();
export const PatientCreateInputObjectSchema: z.ZodType<Prisma.PatientCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.PatientCreateInput>;
export const PatientCreateInputObjectZodSchema = makeSchema();
