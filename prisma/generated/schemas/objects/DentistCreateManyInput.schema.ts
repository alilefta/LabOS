import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  clinicId: z.string(),
  labId: z.string(),
  name: z.string(),
  email: z.string().optional().nullable(),
  phoneNumber: z.string().optional().nullable(),
  isOwner: z.boolean().optional(),
  isDefault: z.boolean().optional(),
  notes: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const DentistCreateManyInputObjectSchema: z.ZodType<Prisma.DentistCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.DentistCreateManyInput>;
export const DentistCreateManyInputObjectZodSchema = makeSchema();
