import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const StoredFileOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.StoredFileOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.StoredFileOrderByRelationAggregateInput>;
export const StoredFileOrderByRelationAggregateInputObjectZodSchema = makeSchema();
