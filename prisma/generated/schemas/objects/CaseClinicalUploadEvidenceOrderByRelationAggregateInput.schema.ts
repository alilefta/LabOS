import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const CaseClinicalUploadEvidenceOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.CaseClinicalUploadEvidenceOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseClinicalUploadEvidenceOrderByRelationAggregateInput>;
export const CaseClinicalUploadEvidenceOrderByRelationAggregateInputObjectZodSchema = makeSchema();
