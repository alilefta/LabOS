import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  measuredSizeBytes: SortOrderSchema.optional(),
  width: SortOrderSchema.optional(),
  height: SortOrderSchema.optional()
}).strict();
export const CaseClinicalUploadEvidenceAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.CaseClinicalUploadEvidenceAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseClinicalUploadEvidenceAvgOrderByAggregateInput>;
export const CaseClinicalUploadEvidenceAvgOrderByAggregateInputObjectZodSchema = makeSchema();
