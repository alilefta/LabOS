import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { PatientGenderSchema } from '../enums/PatientGender.schema';
import { CaseCreateNestedManyWithoutPatientInputObjectSchema as CaseCreateNestedManyWithoutPatientInputObjectSchema } from './CaseCreateNestedManyWithoutPatientInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  age: z.number().int().optional().nullable(),
  gender: PatientGenderSchema.optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  cases: z.lazy(() => CaseCreateNestedManyWithoutPatientInputObjectSchema).optional()
}).strict();
export const PatientCreateWithoutLabInputObjectSchema: z.ZodType<Prisma.PatientCreateWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.PatientCreateWithoutLabInput>;
export const PatientCreateWithoutLabInputObjectZodSchema = makeSchema();
