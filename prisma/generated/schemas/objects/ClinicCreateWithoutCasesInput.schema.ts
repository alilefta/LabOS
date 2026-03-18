import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabCreateNestedOneWithoutClinicsInputObjectSchema as LabCreateNestedOneWithoutClinicsInputObjectSchema } from './LabCreateNestedOneWithoutClinicsInput.schema'

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
  updatedAt: z.coerce.date().optional(),
  Lab: z.lazy(() => LabCreateNestedOneWithoutClinicsInputObjectSchema)
}).strict();
export const ClinicCreateWithoutCasesInputObjectSchema: z.ZodType<Prisma.ClinicCreateWithoutCasesInput> = makeSchema() as unknown as z.ZodType<Prisma.ClinicCreateWithoutCasesInput>;
export const ClinicCreateWithoutCasesInputObjectZodSchema = makeSchema();
