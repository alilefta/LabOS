import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseCreateNestedManyWithoutPatientInputObjectSchema as CaseCreateNestedManyWithoutPatientInputObjectSchema } from './CaseCreateNestedManyWithoutPatientInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  city: z.string(),
  zipcode: z.string().optional().nullable(),
  address1: z.string(),
  address2: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  phoneNumber: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  cases: z.lazy(() => CaseCreateNestedManyWithoutPatientInputObjectSchema).optional()
}).strict();
export const PatientCreateWithoutLabInputObjectSchema: z.ZodType<Prisma.PatientCreateWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.PatientCreateWithoutLabInput>;
export const PatientCreateWithoutLabInputObjectZodSchema = makeSchema();
