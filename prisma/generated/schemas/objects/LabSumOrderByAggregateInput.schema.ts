import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  nextCaseNumber: SortOrderSchema.optional()
}).strict();
export const LabSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.LabSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.LabSumOrderByAggregateInput>;
export const LabSumOrderByAggregateInputObjectZodSchema = makeSchema();
