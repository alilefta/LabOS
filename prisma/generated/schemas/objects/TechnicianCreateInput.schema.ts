import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabCreateNestedOneWithoutTechniciansInputObjectSchema as LabCreateNestedOneWithoutTechniciansInputObjectSchema } from './LabCreateNestedOneWithoutTechniciansInput.schema';
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
  lab: z.lazy(() => LabCreateNestedOneWithoutTechniciansInputObjectSchema),
  cases: z.lazy(() => CaseCreateNestedManyWithoutTechnicianInputObjectSchema).optional()
}).strict();
export const TechnicianCreateInputObjectSchema: z.ZodType<Prisma.TechnicianCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.TechnicianCreateInput>;
export const TechnicianCreateInputObjectZodSchema = makeSchema();
