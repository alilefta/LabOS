import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  cleanupAttemptCount: z.literal(true).optional()
}).strict();
export const FileUploadGrantAvgAggregateInputObjectSchema: z.ZodType<Prisma.FileUploadGrantAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.FileUploadGrantAvgAggregateInputType>;
export const FileUploadGrantAvgAggregateInputObjectZodSchema = makeSchema();
