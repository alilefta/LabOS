import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  invoiceId: SortOrderSchema.optional(),
  caseId: SortOrderSchema.optional(),
  caseTotal: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional()
}).strict();
export const InvoiceCaseMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.InvoiceCaseMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.InvoiceCaseMinOrderByAggregateInput>;
export const InvoiceCaseMinOrderByAggregateInputObjectZodSchema = makeSchema();
