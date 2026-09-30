import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  sizeBytes: z.literal(true).optional()
}).strict();
export const StoredFileAvgAggregateInputObjectSchema: z.ZodType<Prisma.StoredFileAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.StoredFileAvgAggregateInputType>;
export const StoredFileAvgAggregateInputObjectZodSchema = makeSchema();
