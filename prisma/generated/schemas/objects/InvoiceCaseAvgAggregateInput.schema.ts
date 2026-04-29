import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  caseTotal: z.literal(true).optional()
}).strict();
export const InvoiceCaseAvgAggregateInputObjectSchema: z.ZodType<Prisma.InvoiceCaseAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.InvoiceCaseAvgAggregateInputType>;
export const InvoiceCaseAvgAggregateInputObjectZodSchema = makeSchema();
