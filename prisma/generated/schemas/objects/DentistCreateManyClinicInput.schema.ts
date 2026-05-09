import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  labId: z.string(),
  name: z.string(),
  email: z.string().optional().nullable(),
  phoneNumber: z.string().optional().nullable(),
  isOwner: z.boolean().optional(),
  isDefault: z.boolean().optional(),
  notes: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
  avatarUrl: z.string().optional().nullable(),
  specialty: z.string().optional().nullable(),
  licenseNumber: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const DentistCreateManyClinicInputObjectSchema: z.ZodType<Prisma.DentistCreateManyClinicInput> = makeSchema() as unknown as z.ZodType<Prisma.DentistCreateManyClinicInput>;
export const DentistCreateManyClinicInputObjectZodSchema = makeSchema();
