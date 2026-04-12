import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  nextCaseNumber: z.literal(true).optional()
}).strict();
export const LabSumAggregateInputObjectSchema: z.ZodType<Prisma.LabSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.LabSumAggregateInputType>;
export const LabSumAggregateInputObjectZodSchema = makeSchema();
