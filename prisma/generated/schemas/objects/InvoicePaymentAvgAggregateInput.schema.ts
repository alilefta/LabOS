import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  amount: z.literal(true).optional()
}).strict();
export const InvoicePaymentAvgAggregateInputObjectSchema: z.ZodType<Prisma.InvoicePaymentAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.InvoicePaymentAvgAggregateInputType>;
export const InvoicePaymentAvgAggregateInputObjectZodSchema = makeSchema();
