import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  sizeBytes: SortOrderSchema.optional()
}).strict();
export const StoredFileAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.StoredFileAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.StoredFileAvgOrderByAggregateInput>;
export const StoredFileAvgOrderByAggregateInputObjectZodSchema = makeSchema();
