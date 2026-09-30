import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  measuredSizeBytes: z.literal(true).optional(),
  width: z.literal(true).optional(),
  height: z.literal(true).optional()
}).strict();
export const CaseClinicalUploadEvidenceSumAggregateInputObjectSchema: z.ZodType<Prisma.CaseClinicalUploadEvidenceSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.CaseClinicalUploadEvidenceSumAggregateInputType>;
export const CaseClinicalUploadEvidenceSumAggregateInputObjectZodSchema = makeSchema();
