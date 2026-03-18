import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseCreateNestedManyWithoutTechnicianInputObjectSchema as CaseCreateNestedManyWithoutTechnicianInputObjectSchema } from './CaseCreateNestedManyWithoutTechnicianInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  firstName: z.string(),
  lastName: z.string(),
  city: z.string(),
  zipcode: z.string(),
  address1: z.string(),
  address2: z.string().optional().nullable(),
  email: z.string(),
  phoneNumber: z.string(),
  avatarUrl: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  cases: z.lazy(() => CaseCreateNestedManyWithoutTechnicianInputObjectSchema).optional()
}).strict();
export const TechnicianCreateWithoutLabInputObjectSchema: z.ZodType<Prisma.TechnicianCreateWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.TechnicianCreateWithoutLabInput>;
export const TechnicianCreateWithoutLabInputObjectZodSchema = makeSchema();
