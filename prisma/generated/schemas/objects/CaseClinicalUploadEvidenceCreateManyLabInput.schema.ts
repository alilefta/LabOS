import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StoredFileProviderSchema } from '../enums/StoredFileProvider.schema';
import { CaseClinicalPurposeSchema } from '../enums/CaseClinicalPurpose.schema';
import { CaseClinicalVerifiedFormatSchema } from '../enums/CaseClinicalVerifiedFormat.schema';
import { CaseClinicalValidatedSuffixSchema } from '../enums/CaseClinicalValidatedSuffix.schema'

const makeSchema = () => z.object({
  uploadGrantId: z.string(),
  caseId: z.string(),
  provider: StoredFileProviderSchema,
  providerObjectKey: z.string(),
  clinicalPurpose: CaseClinicalPurposeSchema,
  verifiedFormat: CaseClinicalVerifiedFormatSchema,
  validatedSuffix: CaseClinicalValidatedSuffixSchema,
  measuredSizeBytes: z.bigint(),
  width: z.number().int(),
  height: z.number().int(),
  contentSha256: z.string().max(64),
  validationProfile: z.string().max(64),
  validatedAt: z.coerce.date()
}).strict();
export const CaseClinicalUploadEvidenceCreateManyLabInputObjectSchema: z.ZodType<Prisma.CaseClinicalUploadEvidenceCreateManyLabInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseClinicalUploadEvidenceCreateManyLabInput>;
export const CaseClinicalUploadEvidenceCreateManyLabInputObjectZodSchema = makeSchema();
