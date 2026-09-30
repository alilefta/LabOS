import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

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
  validatedAt: SortOrderSchema.optional()
}).strict();
export const CaseClinicalUploadEvidenceCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.CaseClinicalUploadEvidenceCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseClinicalUploadEvidenceCountOrderByAggregateInput>;
export const CaseClinicalUploadEvidenceCountOrderByAggregateInputObjectZodSchema = makeSchema();
