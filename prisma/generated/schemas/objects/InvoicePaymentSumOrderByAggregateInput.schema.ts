import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  amount: SortOrderSchema.optional()
}).strict();
export const InvoicePaymentSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.InvoicePaymentSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.InvoicePaymentSumOrderByAggregateInput>;
export const InvoicePaymentSumOrderByAggregateInputObjectZodSchema = makeSchema();
