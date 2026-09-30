import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { CaseClinicalUploadEvidenceCountOrderByAggregateInputObjectSchema as CaseClinicalUploadEvidenceCountOrderByAggregateInputObjectSchema } from './CaseClinicalUploadEvidenceCountOrderByAggregateInput.schema';
import { CaseClinicalUploadEvidenceAvgOrderByAggregateInputObjectSchema as CaseClinicalUploadEvidenceAvgOrderByAggregateInputObjectSchema } from './CaseClinicalUploadEvidenceAvgOrderByAggregateInput.schema';
import { CaseClinicalUploadEvidenceMaxOrderByAggregateInputObjectSchema as CaseClinicalUploadEvidenceMaxOrderByAggregateInputObjectSchema } from './CaseClinicalUploadEvidenceMaxOrderByAggregateInput.schema';
import { CaseClinicalUploadEvidenceMinOrderByAggregateInputObjectSchema as CaseClinicalUploadEvidenceMinOrderByAggregateInputObjectSchema } from './CaseClinicalUploadEvidenceMinOrderByAggregateInput.schema';
import { CaseClinicalUploadEvidenceSumOrderByAggregateInputObjectSchema as CaseClinicalUploadEvidenceSumOrderByAggregateInputObjectSchema } from './CaseClinicalUploadEvidenceSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  uploadGrantId: SortOrderSchema.optional(),
  organizationId: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional(),
  caseId: SortOrderSchema.optional(),
  provider: SortOrderSchema.optional(),
  providerObjectKey: SortOrderSchema.optional(),
  clinicalPurpose: SortOrderSchema.optional(),
  verifiedFormat: SortOrderSchema.optional(),
  validatedSuffix: SortOrderSchema.optional(),
  measuredSizeBytes: SortOrderSchema.optional(),
  width: SortOrderSchema.optional(),
  height: SortOrderSchema.optional(),
  contentSha256: SortOrderSchema.optional(),
  validationProfile: SortOrderSchema.optional(),
  validatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => CaseClinicalUploadEvidenceCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => CaseClinicalUploadEvidenceAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => CaseClinicalUploadEvidenceMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => CaseClinicalUploadEvidenceMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => CaseClinicalUploadEvidenceSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const CaseClinicalUploadEvidenceOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.CaseClinicalUploadEvidenceOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseClinicalUploadEvidenceOrderByWithAggregationInput>;
export const CaseClinicalUploadEvidenceOrderByWithAggregationInputObjectZodSchema = makeSchema();
