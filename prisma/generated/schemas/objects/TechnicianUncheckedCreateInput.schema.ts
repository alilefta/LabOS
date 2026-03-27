import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseUncheckedCreateNestedManyWithoutTechnicianInputObjectSchema as CaseUncheckedCreateNestedManyWithoutTechnicianInputObjectSchema } from './CaseUncheckedCreateNestedManyWithoutTechnicianInput.schema'

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
  cases: z.lazy(() => CaseUncheckedCreateNestedManyWithoutTechnicianInputObjectSchema).optional()
}).strict();
export const TechnicianUncheckedCreateInputObjectSchema: z.ZodType<Prisma.TechnicianUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.TechnicianUncheckedCreateInput>;
export const TechnicianUncheckedCreateInputObjectZodSchema = makeSchema();
