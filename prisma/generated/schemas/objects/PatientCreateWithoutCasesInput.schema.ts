import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabCreateNestedOneWithoutPatientsInputObjectSchema as LabCreateNestedOneWithoutPatientsInputObjectSchema } from './LabCreateNestedOneWithoutPatientsInput.schema'

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
  lab: z.lazy(() => LabCreateNestedOneWithoutPatientsInputObjectSchema)
}).strict();
export const PatientCreateWithoutCasesInputObjectSchema: z.ZodType<Prisma.PatientCreateWithoutCasesInput> = makeSchema() as unknown as z.ZodType<Prisma.PatientCreateWithoutCasesInput>;
export const PatientCreateWithoutCasesInputObjectZodSchema = makeSchema();
