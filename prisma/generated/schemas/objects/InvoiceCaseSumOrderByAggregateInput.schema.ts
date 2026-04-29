import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  caseTotal: SortOrderSchema.optional()
}).strict();
export const InvoiceCaseSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.InvoiceCaseSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.InvoiceCaseSumOrderByAggregateInput>;
export const InvoiceCaseSumOrderByAggregateInputObjectZodSchema = makeSchema();
