import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  amount: z.literal(true).optional()
}).strict();
export const InvoicePaymentSumAggregateInputObjectSchema: z.ZodType<Prisma.InvoicePaymentSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.InvoicePaymentSumAggregateInputType>;
export const InvoicePaymentSumAggregateInputObjectZodSchema = makeSchema();
