import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseUncheckedCreateNestedManyWithoutClinicInputObjectSchema as CaseUncheckedCreateNestedManyWithoutClinicInputObjectSchema } from './CaseUncheckedCreateNestedManyWithoutClinicInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  labId: z.string(),
  name: z.string(),
  description: z.string().optional().nullable(),
  city: z.string(),
  zipcode: z.string(),
  address1: z.string(),
  address2: z.string().optional().nullable(),
  email: z.string(),
  phoneNumber: z.string(),
  createdAt: z.coerce.date().optional(),
  cases: z.lazy(() => CaseUncheckedCreateNestedManyWithoutClinicInputObjectSchema).optional()
}).strict();
export const ClinicUncheckedCreateInputObjectSchema: z.ZodType<Prisma.ClinicUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.ClinicUncheckedCreateInput>;
export const ClinicUncheckedCreateInputObjectZodSchema = makeSchema();
