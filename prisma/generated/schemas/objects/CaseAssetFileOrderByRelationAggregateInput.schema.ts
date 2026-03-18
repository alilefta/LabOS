import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const CaseAssetFileOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.CaseAssetFileOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileOrderByRelationAggregateInput>;
export const CaseAssetFileOrderByRelationAggregateInputObjectZodSchema = makeSchema();
