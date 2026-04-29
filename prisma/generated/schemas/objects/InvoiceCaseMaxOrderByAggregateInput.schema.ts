import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  invoiceId: SortOrderSchema.optional(),
  caseId: SortOrderSchema.optional(),
  caseTotal: SortOrderSchema.optional()
}).strict();
export const InvoiceCaseMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.InvoiceCaseMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.InvoiceCaseMaxOrderByAggregateInput>;
export const InvoiceCaseMaxOrderByAggregateInputObjectZodSchema = makeSchema();
