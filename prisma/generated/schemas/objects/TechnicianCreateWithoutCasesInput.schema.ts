import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabCreateNestedOneWithoutTechniciansInputObjectSchema as LabCreateNestedOneWithoutTechniciansInputObjectSchema } from './LabCreateNestedOneWithoutTechniciansInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  firstName: z.string(),
  lastName: z.string(),
  city: z.string(),
  zipcode: z.string().optional().nullable(),
  address1: z.string(),
  address2: z.string().optional().nullable(),
  email: z.string(),
  phoneNumber: z.string(),
  avatarUrl: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  lab: z.lazy(() => LabCreateNestedOneWithoutTechniciansInputObjectSchema)
}).strict();
export const TechnicianCreateWithoutCasesInputObjectSchema: z.ZodType<Prisma.TechnicianCreateWithoutCasesInput> = makeSchema() as unknown as z.ZodType<Prisma.TechnicianCreateWithoutCasesInput>;
export const TechnicianCreateWithoutCasesInputObjectZodSchema = makeSchema();
