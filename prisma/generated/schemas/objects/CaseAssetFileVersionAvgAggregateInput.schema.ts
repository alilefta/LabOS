import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  versionNumber: z.literal(true).optional()
}).strict();
export const CaseAssetFileVersionAvgAggregateInputObjectSchema: z.ZodType<Prisma.CaseAssetFileVersionAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileVersionAvgAggregateInputType>;
export const CaseAssetFileVersionAvgAggregateInputObjectZodSchema = makeSchema();
