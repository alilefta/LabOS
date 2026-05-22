import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  subtotal: SortOrderSchema.optional(),
  discountAmount: SortOrderSchema.optional(),
  appliedDiscountPercentage: SortOrderSchema.optional(),
  total: SortOrderSchema.optional(),
  amountPaid: SortOrderSchema.optional(),
  amountDue: SortOrderSchema.optional()
}).strict();
export const InvoiceSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.InvoiceSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.InvoiceSumOrderByAggregateInput>;
export const InvoiceSumOrderByAggregateInputObjectZodSchema = makeSchema();
