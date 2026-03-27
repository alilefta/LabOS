import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  clinicId: z.literal(true).optional(),
  labId: z.literal(true).optional(),
  name: z.literal(true).optional(),
  email: z.literal(true).optional(),
  phoneNumber: z.literal(true).optional(),
  isOwner: z.literal(true).optional(),
  isDefault: z.literal(true).optional(),
  notes: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const DentistMaxAggregateInputObjectSchema: z.ZodType<Prisma.DentistMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.DentistMaxAggregateInputType>;
export const DentistMaxAggregateInputObjectZodSchema = makeSchema();
