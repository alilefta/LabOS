import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { EnumStoredFileProviderWithAggregatesFilterObjectSchema as EnumStoredFileProviderWithAggregatesFilterObjectSchema } from './EnumStoredFileProviderWithAggregatesFilter.schema';
import { StoredFileProviderSchema } from '../enums/StoredFileProvider.schema';
import { EnumCaseClinicalPurposeWithAggregatesFilterObjectSchema as EnumCaseClinicalPurposeWithAggregatesFilterObjectSchema } from './EnumCaseClinicalPurposeWithAggregatesFilter.schema';
import { CaseClinicalPurposeSchema } from '../enums/CaseClinicalPurpose.schema';
import { EnumCaseClinicalVerifiedFormatWithAggregatesFilterObjectSchema as EnumCaseClinicalVerifiedFormatWithAggregatesFilterObjectSchema } from './EnumCaseClinicalVerifiedFormatWithAggregatesFilter.schema';
import { CaseClinicalVerifiedFormatSchema } from '../enums/CaseClinicalVerifiedFormat.schema';
import { EnumCaseClinicalValidatedSuffixWithAggregatesFilterObjectSchema as EnumCaseClinicalValidatedSuffixWithAggregatesFilterObjectSchema } from './EnumCaseClinicalValidatedSuffixWithAggregatesFilter.schema';
import { CaseClinicalValidatedSuffixSchema } from '../enums/CaseClinicalValidatedSuffix.schema';
import { BigIntWithAggregatesFilterObjectSchema as BigIntWithAggregatesFilterObjectSchema } from './BigIntWithAggregatesFilter.schema';
import { IntWithAggregatesFilterObjectSchema as IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const caseclinicaluploadevidencescalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => CaseClinicalUploadEvidenceScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => CaseClinicalUploadEvidenceScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => CaseClinicalUploadEvidenceScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => CaseClinicalUploadEvidenceScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => CaseClinicalUploadEvidenceScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  uploadGrantId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  organizationId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  labId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  caseId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  provider: z.union([z.lazy(() => EnumStoredFileProviderWithAggregatesFilterObjectSchema), StoredFileProviderSchema]).optional(),
  providerObjectKey: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  clinicalPurpose: z.union([z.lazy(() => EnumCaseClinicalPurposeWithAggregatesFilterObjectSchema), CaseClinicalPurposeSchema]).optional(),
  verifiedFormat: z.union([z.lazy(() => EnumCaseClinicalVerifiedFormatWithAggregatesFilterObjectSchema), CaseClinicalVerifiedFormatSchema]).optional(),
  validatedSuffix: z.union([z.lazy(() => EnumCaseClinicalValidatedSuffixWithAggregatesFilterObjectSchema), CaseClinicalValidatedSuffixSchema]).optional(),
  measuredSizeBytes: z.union([z.lazy(() => BigIntWithAggregatesFilterObjectSchema), z.bigint()]).optional(),
  width: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  height: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  contentSha256: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string().max(64)]).optional(),
  validationProfile: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string().max(64)]).optional(),
  validatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const CaseClinicalUploadEvidenceScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.CaseClinicalUploadEvidenceScalarWhereWithAggregatesInput> = caseclinicaluploadevidencescalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.CaseClinicalUploadEvidenceScalarWhereWithAggregatesInput>;
export const CaseClinicalUploadEvidenceScalarWhereWithAggregatesInputObjectZodSchema = caseclinicaluploadevidencescalarwherewithaggregatesinputSchema;
