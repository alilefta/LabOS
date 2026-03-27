import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  discount: z.literal(true).optional(),
  creditLimit: z.literal(true).optional(),
  currentBalance: z.literal(true).optional()
}).strict();
export const ClinicAvgAggregateInputObjectSchema: z.ZodType<Prisma.ClinicAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ClinicAvgAggregateInputType>;
export const ClinicAvgAggregateInputObjectZodSchema = makeSchema();
