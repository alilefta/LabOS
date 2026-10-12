import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StoredFileProviderSchema } from '../enums/StoredFileProvider.schema';
import { CaseClinicalPurposeSchema } from '../enums/CaseClinicalPurpose.schema';
import { CaseClinicalVerifiedFormatSchema } from '../enums/CaseClinicalVerifiedFormat.schema';
import { CaseClinicalValidatedSuffixSchema } from '../enums/CaseClinicalValidatedSuffix.schema';
import { CaseClinicalCodecBackendSchema } from '../enums/CaseClinicalCodecBackend.schema'

const makeSchema = () => z.object({
  uploadGrantId: z.string(),
  organizationId: z.string(),
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
  validatorVersion: z.string().max(48).optional().nullable(),
  codecBackend: CaseClinicalCodecBackendSchema.optional().nullable(),
  codecPackageVersion: z.string().max(24).optional().nullable(),
  codecLibraryVersion: z.string().max(24).optional().nullable(),
  codecRuntimeSha256: z.string().max(64).optional().nullable(),
  sourceComponents: z.number().int().optional().nullable(),
  isProgressive: z.boolean().optional().nullable(),
  validatedAt: z.coerce.date()
}).strict();
export const CaseClinicalUploadEvidenceCreateManyDentalCaseInputObjectSchema: z.ZodType<Prisma.CaseClinicalUploadEvidenceCreateManyDentalCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseClinicalUploadEvidenceCreateManyDentalCaseInput>;
export const CaseClinicalUploadEvidenceCreateManyDentalCaseInputObjectZodSchema = makeSchema();
