import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  amount: SortOrderSchema.optional()
}).strict();
export const InvoicePaymentAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.InvoicePaymentAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.InvoicePaymentAvgOrderByAggregateInput>;
export const InvoicePaymentAvgOrderByAggregateInputObjectZodSchema = makeSchema();
