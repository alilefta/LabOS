import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseClinicalPurposeSchema } from '../enums/CaseClinicalPurpose.schema';
import { CaseClinicalVerifiedFormatSchema } from '../enums/CaseClinicalVerifiedFormat.schema';
import { CaseClinicalValidatedSuffixSchema } from '../enums/CaseClinicalValidatedSuffix.schema';
import { CaseClinicalCodecBackendSchema } from '../enums/CaseClinicalCodecBackend.schema'

const makeSchema = () => z.object({
  caseId: z.string(),
  clinicalPurpose: CaseClinicalPurposeSchema,
  verifiedFormat: CaseClinicalVerifiedFormatSchema,
  validatedSuffix: CaseClinicalValidatedSuffixSchema,
  measuredSizeBytes: z.bigint(),
  width: z.number().int(),
  height: z.number().int(),
  contentSha256: z.string(),
  validationProfile: z.string(),
  validatorVersion: z.string().optional().nullable(),
  codecBackend: CaseClinicalCodecBackendSchema.optional().nullable(),
  codecPackageVersion: z.string().optional().nullable(),
  codecLibraryVersion: z.string().optional().nullable(),
  codecRuntimeSha256: z.string().optional().nullable(),
  sourceComponents: z.number().int().optional().nullable(),
  isProgressive: z.boolean().optional().nullable(),
  validatedAt: z.coerce.date()
}).strict();
export const CaseClinicalUploadEvidenceUncheckedCreateWithoutUploadGrantInputObjectSchema: z.ZodType<Prisma.CaseClinicalUploadEvidenceUncheckedCreateWithoutUploadGrantInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseClinicalUploadEvidenceUncheckedCreateWithoutUploadGrantInput>;
export const CaseClinicalUploadEvidenceUncheckedCreateWithoutUploadGrantInputObjectZodSchema = makeSchema();
