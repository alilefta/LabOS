import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  labId: z.literal(true).optional(),
  name: z.literal(true).optional(),
  description: z.literal(true).optional(),
  city: z.literal(true).optional(),
  zipcode: z.literal(true).optional(),
  address1: z.literal(true).optional(),
  address2: z.literal(true).optional(),
  email: z.literal(true).optional(),
  phoneNumber: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const ClinicMinAggregateInputObjectSchema: z.ZodType<Prisma.ClinicMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ClinicMinAggregateInputType>;
export const ClinicMinAggregateInputObjectZodSchema = makeSchema();
