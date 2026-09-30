import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  uploadGrantId: z.literal(true).optional(),
  organizationId: z.literal(true).optional(),
  labId: z.literal(true).optional(),
  caseId: z.literal(true).optional(),
  provider: z.literal(true).optional(),
  providerObjectKey: z.literal(true).optional(),
  clinicalPurpose: z.literal(true).optional(),
  verifiedFormat: z.literal(true).optional(),
  validatedSuffix: z.literal(true).optional(),
  measuredSizeBytes: z.literal(true).optional(),
  width: z.literal(true).optional(),
  height: z.literal(true).optional(),
  contentSha256: z.literal(true).optional(),
  validationProfile: z.literal(true).optional(),
  validatedAt: z.literal(true).optional()
}).strict();
export const CaseClinicalUploadEvidenceMaxAggregateInputObjectSchema: z.ZodType<Prisma.CaseClinicalUploadEvidenceMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.CaseClinicalUploadEvidenceMaxAggregateInputType>;
export const CaseClinicalUploadEvidenceMaxAggregateInputObjectZodSchema = makeSchema();
