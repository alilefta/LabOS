import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseUncheckedCreateNestedManyWithoutClinicInputObjectSchema as CaseUncheckedCreateNestedManyWithoutClinicInputObjectSchema } from './CaseUncheckedCreateNestedManyWithoutClinicInput.schema'

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
  cases: z.lazy(() => CaseUncheckedCreateNestedManyWithoutClinicInputObjectSchema).optional()
}).strict();
export const ClinicUncheckedCreateWithoutLabInputObjectSchema: z.ZodType<Prisma.ClinicUncheckedCreateWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.ClinicUncheckedCreateWithoutLabInput>;
export const ClinicUncheckedCreateWithoutLabInputObjectZodSchema = makeSchema();
