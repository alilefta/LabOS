import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  cleanupAttemptCount: SortOrderSchema.optional()
}).strict();
export const FileUploadGrantSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.FileUploadGrantSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.FileUploadGrantSumOrderByAggregateInput>;
export const FileUploadGrantSumOrderByAggregateInputObjectZodSchema = makeSchema();
