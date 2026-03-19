import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabCreateNestedOneWithoutClinicsInputObjectSchema as LabCreateNestedOneWithoutClinicsInputObjectSchema } from './LabCreateNestedOneWithoutClinicsInput.schema';
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
  lab: z.lazy(() => LabCreateNestedOneWithoutClinicsInputObjectSchema),
  cases: z.lazy(() => CaseCreateNestedManyWithoutClinicInputObjectSchema).optional()
}).strict();
export const ClinicCreateInputObjectSchema: z.ZodType<Prisma.ClinicCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.ClinicCreateInput>;
export const ClinicCreateInputObjectZodSchema = makeSchema();
