import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseCreateNestedManyWithoutPatientInputObjectSchema as CaseCreateNestedManyWithoutPatientInputObjectSchema } from './CaseCreateNestedManyWithoutPatientInput.schema';
import { LabCreateNestedOneWithoutPatientInputObjectSchema as LabCreateNestedOneWithoutPatientInputObjectSchema } from './LabCreateNestedOneWithoutPatientInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  city: z.string(),
  zipcode: z.string(),
  address1: z.string(),
  address2: z.string().optional().nullable(),
  email: z.string(),
  phoneNumber: z.string(),
  createdAt: z.coerce.date().optional(),
  case: z.lazy(() => CaseCreateNestedManyWithoutPatientInputObjectSchema).optional(),
  Lab: z.lazy(() => LabCreateNestedOneWithoutPatientInputObjectSchema)
}).strict();
export const PatientCreateInputObjectSchema: z.ZodType<Prisma.PatientCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.PatientCreateInput>;
export const PatientCreateInputObjectZodSchema = makeSchema();
