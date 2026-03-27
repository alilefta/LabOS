import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { PatientGenderSchema } from '../enums/PatientGender.schema';
import { LabCreateNestedOneWithoutPatientsInputObjectSchema as LabCreateNestedOneWithoutPatientsInputObjectSchema } from './LabCreateNestedOneWithoutPatientsInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  age: z.number().int().optional().nullable(),
  gender: PatientGenderSchema.optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  lab: z.lazy(() => LabCreateNestedOneWithoutPatientsInputObjectSchema)
}).strict();
export const PatientCreateWithoutCasesInputObjectSchema: z.ZodType<Prisma.PatientCreateWithoutCasesInput> = makeSchema() as unknown as z.ZodType<Prisma.PatientCreateWithoutCasesInput>;
export const PatientCreateWithoutCasesInputObjectZodSchema = makeSchema();
