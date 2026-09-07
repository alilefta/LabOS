import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  cleanupAttemptCount: z.literal(true).optional()
}).strict();
export const FileUploadGrantSumAggregateInputObjectSchema: z.ZodType<Prisma.FileUploadGrantSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.FileUploadGrantSumAggregateInputType>;
export const FileUploadGrantSumAggregateInputObjectZodSchema = makeSchema();
