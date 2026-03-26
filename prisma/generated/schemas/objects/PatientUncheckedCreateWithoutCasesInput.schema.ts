import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


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
  labId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const PatientUncheckedCreateWithoutCasesInputObjectSchema: z.ZodType<Prisma.PatientUncheckedCreateWithoutCasesInput> = makeSchema() as unknown as z.ZodType<Prisma.PatientUncheckedCreateWithoutCasesInput>;
export const PatientUncheckedCreateWithoutCasesInputObjectZodSchema = makeSchema();
