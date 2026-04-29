import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  subtotal: z.literal(true).optional(),
  discountAmount: z.literal(true).optional(),
  total: z.literal(true).optional(),
  amountPaid: z.literal(true).optional(),
  amountDue: z.literal(true).optional()
}).strict();
export const InvoiceSumAggregateInputObjectSchema: z.ZodType<Prisma.InvoiceSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.InvoiceSumAggregateInputType>;
export const InvoiceSumAggregateInputObjectZodSchema = makeSchema();
