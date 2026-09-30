import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  measuredSizeBytes: z.literal(true).optional(),
  width: z.literal(true).optional(),
  height: z.literal(true).optional()
}).strict();
export const CaseClinicalUploadEvidenceAvgAggregateInputObjectSchema: z.ZodType<Prisma.CaseClinicalUploadEvidenceAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.CaseClinicalUploadEvidenceAvgAggregateInputType>;
export const CaseClinicalUploadEvidenceAvgAggregateInputObjectZodSchema = makeSchema();
