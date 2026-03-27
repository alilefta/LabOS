import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { PatientGenderSchema } from '../enums/PatientGender.schema'

const makeSchema = () => z.object({
  set: PatientGenderSchema.optional()
}).strict();
export const NullableEnumPatientGenderFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.NullableEnumPatientGenderFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.NullableEnumPatientGenderFieldUpdateOperationsInput>;
export const NullableEnumPatientGenderFieldUpdateOperationsInputObjectZodSchema = makeSchema();
