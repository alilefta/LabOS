import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseClinicalPurposeSchema } from '../enums/CaseClinicalPurpose.schema';
import { CaseClinicalVerifiedFormatSchema } from '../enums/CaseClinicalVerifiedFormat.schema';
import { CaseClinicalValidatedSuffixSchema } from '../enums/CaseClinicalValidatedSuffix.schema'

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
  validatedAt: z.coerce.date()
}).strict();
export const CaseClinicalUploadEvidenceUncheckedCreateWithoutUploadGrantInputObjectSchema: z.ZodType<Prisma.CaseClinicalUploadEvidenceUncheckedCreateWithoutUploadGrantInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseClinicalUploadEvidenceUncheckedCreateWithoutUploadGrantInput>;
export const CaseClinicalUploadEvidenceUncheckedCreateWithoutUploadGrantInputObjectZodSchema = makeSchema();
