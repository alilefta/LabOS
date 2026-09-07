import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  cleanupAttemptCount: SortOrderSchema.optional()
}).strict();
export const FileUploadGrantAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.FileUploadGrantAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.FileUploadGrantAvgOrderByAggregateInput>;
export const FileUploadGrantAvgOrderByAggregateInputObjectZodSchema = makeSchema();
