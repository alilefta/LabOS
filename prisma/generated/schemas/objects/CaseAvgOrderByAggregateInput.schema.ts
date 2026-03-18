import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  grandTotal: SortOrderSchema.optional()
}).strict();
export const CaseAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.CaseAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAvgOrderByAggregateInput>;
export const CaseAvgOrderByAggregateInputObjectZodSchema = makeSchema();
