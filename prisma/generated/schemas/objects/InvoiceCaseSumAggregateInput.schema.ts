import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  caseTotal: z.literal(true).optional()
}).strict();
export const InvoiceCaseSumAggregateInputObjectSchema: z.ZodType<Prisma.InvoiceCaseSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.InvoiceCaseSumAggregateInputType>;
export const InvoiceCaseSumAggregateInputObjectZodSchema = makeSchema();
