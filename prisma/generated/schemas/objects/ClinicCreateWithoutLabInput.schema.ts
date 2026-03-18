import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseCreateNestedManyWithoutClinicInputObjectSchema as CaseCreateNestedManyWithoutClinicInputObjectSchema } from './CaseCreateNestedManyWithoutClinicInput.schema'

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
  cases: z.lazy(() => CaseCreateNestedManyWithoutClinicInputObjectSchema).optional()
}).strict();
export const ClinicCreateWithoutLabInputObjectSchema: z.ZodType<Prisma.ClinicCreateWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.ClinicCreateWithoutLabInput>;
export const ClinicCreateWithoutLabInputObjectZodSchema = makeSchema();
