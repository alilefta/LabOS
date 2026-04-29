import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  caseTotal: SortOrderSchema.optional()
}).strict();
export const InvoiceCaseAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.InvoiceCaseAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.InvoiceCaseAvgOrderByAggregateInput>;
export const InvoiceCaseAvgOrderByAggregateInputObjectZodSchema = makeSchema();
