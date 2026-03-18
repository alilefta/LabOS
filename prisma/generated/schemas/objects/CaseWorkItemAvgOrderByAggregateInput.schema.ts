import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  totalPrice: SortOrderSchema.optional(),
  firstToothPrice: SortOrderSchema.optional(),
  bulkPrice: SortOrderSchema.optional(),
  additionalToothPrice: SortOrderSchema.optional(),
  bulkPriceThreshold: SortOrderSchema.optional()
}).strict();
export const CaseWorkItemAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.CaseWorkItemAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemAvgOrderByAggregateInput>;
export const CaseWorkItemAvgOrderByAggregateInputObjectZodSchema = makeSchema();
