import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  nextCaseNumber: z.literal(true).optional()
}).strict();
export const LabAvgAggregateInputObjectSchema: z.ZodType<Prisma.LabAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.LabAvgAggregateInputType>;
export const LabAvgAggregateInputObjectZodSchema = makeSchema();
