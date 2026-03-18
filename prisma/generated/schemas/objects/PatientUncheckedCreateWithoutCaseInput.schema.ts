import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


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
  updatedAt: z.coerce.date().optional()
}).strict();
export const PatientUncheckedCreateWithoutCaseInputObjectSchema: z.ZodType<Prisma.PatientUncheckedCreateWithoutCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.PatientUncheckedCreateWithoutCaseInput>;
export const PatientUncheckedCreateWithoutCaseInputObjectZodSchema = makeSchema();
