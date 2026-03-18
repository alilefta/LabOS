import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseUncheckedCreateNestedManyWithoutPatientInputObjectSchema as CaseUncheckedCreateNestedManyWithoutPatientInputObjectSchema } from './CaseUncheckedCreateNestedManyWithoutPatientInput.schema'

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
  labId: z.string(),
  createdAt: z.coerce.date().optional(),
  case: z.lazy(() => CaseUncheckedCreateNestedManyWithoutPatientInputObjectSchema).optional()
}).strict();
export const PatientUncheckedCreateInputObjectSchema: z.ZodType<Prisma.PatientUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.PatientUncheckedCreateInput>;
export const PatientUncheckedCreateInputObjectZodSchema = makeSchema();
