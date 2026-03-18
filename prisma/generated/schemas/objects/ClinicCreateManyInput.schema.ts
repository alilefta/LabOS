import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


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
  updatedAt: z.coerce.date().optional()
}).strict();
export const ClinicCreateManyInputObjectSchema: z.ZodType<Prisma.ClinicCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.ClinicCreateManyInput>;
export const ClinicCreateManyInputObjectZodSchema = makeSchema();
