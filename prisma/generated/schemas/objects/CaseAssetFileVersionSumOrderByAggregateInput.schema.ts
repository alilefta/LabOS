import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  versionNumber: SortOrderSchema.optional()
}).strict();
export const CaseAssetFileVersionSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.CaseAssetFileVersionSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileVersionSumOrderByAggregateInput>;
export const CaseAssetFileVersionSumOrderByAggregateInputObjectZodSchema = makeSchema();
