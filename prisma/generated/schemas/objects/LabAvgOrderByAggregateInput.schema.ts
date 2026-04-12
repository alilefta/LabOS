import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  nextCaseNumber: SortOrderSchema.optional()
}).strict();
export const LabAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.LabAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.LabAvgOrderByAggregateInput>;
export const LabAvgOrderByAggregateInputObjectZodSchema = makeSchema();
