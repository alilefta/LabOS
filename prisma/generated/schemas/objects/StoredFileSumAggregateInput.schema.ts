import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  sizeBytes: z.literal(true).optional()
}).strict();
export const StoredFileSumAggregateInputObjectSchema: z.ZodType<Prisma.StoredFileSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.StoredFileSumAggregateInputType>;
export const StoredFileSumAggregateInputObjectZodSchema = makeSchema();
