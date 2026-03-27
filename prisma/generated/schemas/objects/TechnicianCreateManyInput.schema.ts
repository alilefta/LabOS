import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  firstName: z.string(),
  lastName: z.string(),
  city: z.string(),
  zipcode: z.string().optional().nullable(),
  address1: z.string(),
  address2: z.string().optional().nullable(),
  labId: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
  avatarUrl: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const TechnicianCreateManyInputObjectSchema: z.ZodType<Prisma.TechnicianCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.TechnicianCreateManyInput>;
export const TechnicianCreateManyInputObjectZodSchema = makeSchema();
