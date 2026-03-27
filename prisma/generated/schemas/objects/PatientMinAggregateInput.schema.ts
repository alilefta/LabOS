import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  name: z.literal(true).optional(),
  description: z.literal(true).optional(),
  notes: z.literal(true).optional(),
  age: z.literal(true).optional(),
  gender: z.literal(true).optional(),
  labId: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const PatientMinAggregateInputObjectSchema: z.ZodType<Prisma.PatientMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.PatientMinAggregateInputType>;
export const PatientMinAggregateInputObjectZodSchema = makeSchema();
