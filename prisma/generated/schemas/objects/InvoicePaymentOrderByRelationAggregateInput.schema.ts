import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const InvoicePaymentOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.InvoicePaymentOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.InvoicePaymentOrderByRelationAggregateInput>;
export const InvoicePaymentOrderByRelationAggregateInputObjectZodSchema = makeSchema();
