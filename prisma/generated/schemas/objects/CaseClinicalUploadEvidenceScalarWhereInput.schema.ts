import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { EnumStoredFileProviderFilterObjectSchema as EnumStoredFileProviderFilterObjectSchema } from './EnumStoredFileProviderFilter.schema';
import { StoredFileProviderSchema } from '../enums/StoredFileProvider.schema';
import { EnumCaseClinicalPurposeFilterObjectSchema as EnumCaseClinicalPurposeFilterObjectSchema } from './EnumCaseClinicalPurposeFilter.schema';
import { CaseClinicalPurposeSchema } from '../enums/CaseClinicalPurpose.schema';
import { EnumCaseClinicalVerifiedFormatFilterObjectSchema as EnumCaseClinicalVerifiedFormatFilterObjectSchema } from './EnumCaseClinicalVerifiedFormatFilter.schema';
import { CaseClinicalVerifiedFormatSchema } from '../enums/CaseClinicalVerifiedFormat.schema';
import { EnumCaseClinicalValidatedSuffixFilterObjectSchema as EnumCaseClinicalValidatedSuffixFilterObjectSchema } from './EnumCaseClinicalValidatedSuffixFilter.schema';
import { CaseClinicalValidatedSuffixSchema } from '../enums/CaseClinicalValidatedSuffix.schema';
import { BigIntFilterObjectSchema as BigIntFilterObjectSchema } from './BigIntFilter.schema';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const caseclinicaluploadevidencescalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => CaseClinicalUploadEvidenceScalarWhereInputObjectSchema), z.lazy(() => CaseClinicalUploadEvidenceScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => CaseClinicalUploadEvidenceScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => CaseClinicalUploadEvidenceScalarWhereInputObjectSchema), z.lazy(() => CaseClinicalUploadEvidenceScalarWhereInputObjectSchema).array()]).optional(),
  uploadGrantId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  organizationId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  labId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  caseId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  provider: z.union([z.lazy(() => EnumStoredFileProviderFilterObjectSchema), StoredFileProviderSchema]).optional(),
  providerObjectKey: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  clinicalPurpose: z.union([z.lazy(() => EnumCaseClinicalPurposeFilterObjectSchema), CaseClinicalPurposeSchema]).optional(),
  verifiedFormat: z.union([z.lazy(() => EnumCaseClinicalVerifiedFormatFilterObjectSchema), CaseClinicalVerifiedFormatSchema]).optional(),
  validatedSuffix: z.union([z.lazy(() => EnumCaseClinicalValidatedSuffixFilterObjectSchema), CaseClinicalValidatedSuffixSchema]).optional(),
  measuredSizeBytes: z.union([z.lazy(() => BigIntFilterObjectSchema), z.bigint()]).optional(),
  width: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  height: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  contentSha256: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  validationProfile: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  validatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const CaseClinicalUploadEvidenceScalarWhereInputObjectSchema: z.ZodType<Prisma.CaseClinicalUploadEvidenceScalarWhereInput> = caseclinicaluploadevidencescalarwhereinputSchema as unknown as z.ZodType<Prisma.CaseClinicalUploadEvidenceScalarWhereInput>;
export const CaseClinicalUploadEvidenceScalarWhereInputObjectZodSchema = caseclinicaluploadevidencescalarwhereinputSchema;
