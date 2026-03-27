import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  age: z.literal(true).optional()
}).strict();
export const PatientAvgAggregateInputObjectSchema: z.ZodType<Prisma.PatientAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.PatientAvgAggregateInputType>;
export const PatientAvgAggregateInputObjectZodSchema = makeSchema();
