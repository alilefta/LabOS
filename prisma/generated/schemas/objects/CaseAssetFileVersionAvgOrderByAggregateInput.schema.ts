import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  versionNumber: SortOrderSchema.optional()
}).strict();
export const CaseAssetFileVersionAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.CaseAssetFileVersionAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileVersionAvgOrderByAggregateInput>;
export const CaseAssetFileVersionAvgOrderByAggregateInputObjectZodSchema = makeSchema();
