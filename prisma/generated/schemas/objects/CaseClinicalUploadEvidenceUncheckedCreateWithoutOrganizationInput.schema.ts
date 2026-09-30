import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StoredFileProviderSchema } from '../enums/StoredFileProvider.schema';
import { CaseClinicalPurposeSchema } from '../enums/CaseClinicalPurpose.schema';
import { CaseClinicalVerifiedFormatSchema } from '../enums/CaseClinicalVerifiedFormat.schema';
import { CaseClinicalValidatedSuffixSchema } from '../enums/CaseClinicalValidatedSuffix.schema'

const makeSchema = () => z.object({
  uploadGrantId: z.string(),
  labId: z.string(),
  caseId: z.string(),
  provider: StoredFileProviderSchema,
  providerObjectKey: z.string(),
  clinicalPurpose: CaseClinicalPurposeSchema,
  verifiedFormat: CaseClinicalVerifiedFormatSchema,
  validatedSuffix: CaseClinicalValidatedSuffixSchema,
  measuredSizeBytes: z.bigint(),
  width: z.number().int(),
  height: z.number().int(),
  contentSha256: z.string(),
  validationProfile: z.string(),
  validatedAt: z.coerce.date()
}).strict();
export const CaseClinicalUploadEvidenceUncheckedCreateWithoutOrganizationInputObjectSchema: z.ZodType<Prisma.CaseClinicalUploadEvidenceUncheckedCreateWithoutOrganizationInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseClinicalUploadEvidenceUncheckedCreateWithoutOrganizationInput>;
export const CaseClinicalUploadEvidenceUncheckedCreateWithoutOrganizationInputObjectZodSchema = makeSchema();
