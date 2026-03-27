import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { PatientGenderSchema } from '../enums/PatientGender.schema';
import { CaseUncheckedCreateNestedManyWithoutPatientInputObjectSchema as CaseUncheckedCreateNestedManyWithoutPatientInputObjectSchema } from './CaseUncheckedCreateNestedManyWithoutPatientInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  age: z.number().int().optional().nullable(),
  gender: PatientGenderSchema.optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  cases: z.lazy(() => CaseUncheckedCreateNestedManyWithoutPatientInputObjectSchema).optional()
}).strict();
export const PatientUncheckedCreateWithoutLabInputObjectSchema: z.ZodType<Prisma.PatientUncheckedCreateWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.PatientUncheckedCreateWithoutLabInput>;
export const PatientUncheckedCreateWithoutLabInputObjectZodSchema = makeSchema();
