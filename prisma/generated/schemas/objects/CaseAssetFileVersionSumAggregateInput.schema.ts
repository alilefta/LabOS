import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  versionNumber: z.literal(true).optional()
}).strict();
export const CaseAssetFileVersionSumAggregateInputObjectSchema: z.ZodType<Prisma.CaseAssetFileVersionSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileVersionSumAggregateInputType>;
export const CaseAssetFileVersionSumAggregateInputObjectZodSchema = makeSchema();
