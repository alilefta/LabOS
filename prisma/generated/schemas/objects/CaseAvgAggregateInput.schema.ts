import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  grandTotal: z.literal(true).optional()
}).strict();
export const CaseAvgAggregateInputObjectSchema: z.ZodType<Prisma.CaseAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.CaseAvgAggregateInputType>;
export const CaseAvgAggregateInputObjectZodSchema = makeSchema();
