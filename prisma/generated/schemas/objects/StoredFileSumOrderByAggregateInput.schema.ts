import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  sizeBytes: SortOrderSchema.optional()
}).strict();
export const StoredFileSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.StoredFileSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.StoredFileSumOrderByAggregateInput>;
export const StoredFileSumOrderByAggregateInputObjectZodSchema = makeSchema();
