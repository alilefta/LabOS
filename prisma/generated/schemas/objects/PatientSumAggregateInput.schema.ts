import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  age: z.literal(true).optional()
}).strict();
export const PatientSumAggregateInputObjectSchema: z.ZodType<Prisma.PatientSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.PatientSumAggregateInputType>;
export const PatientSumAggregateInputObjectZodSchema = makeSchema();
