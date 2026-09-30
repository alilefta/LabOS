import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  measuredSizeBytes: SortOrderSchema.optional(),
  width: SortOrderSchema.optional(),
  height: SortOrderSchema.optional()
}).strict();
export const CaseClinicalUploadEvidenceSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.CaseClinicalUploadEvidenceSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseClinicalUploadEvidenceSumOrderByAggregateInput>;
export const CaseClinicalUploadEvidenceSumOrderByAggregateInputObjectZodSchema = makeSchema();
