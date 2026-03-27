import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { PatientGenderSchema } from '../enums/PatientGender.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  age: z.number().int().optional().nullable(),
  gender: PatientGenderSchema.optional().nullable(),
  labId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const PatientCreateManyInputObjectSchema: z.ZodType<Prisma.PatientCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.PatientCreateManyInput>;
export const PatientCreateManyInputObjectZodSchema = makeSchema();
