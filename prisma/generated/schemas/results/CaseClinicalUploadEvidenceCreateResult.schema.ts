import * as z from 'zod';
export const CaseClinicalUploadEvidenceCreateResultSchema = z.object({
  uploadGrantId: z.string(),
  organizationId: z.string(),
  labId: z.string(),
  caseId: z.string(),
  provider: z.unknown(),
  providerObjectKey: z.string(),
  clinicalPurpose: z.unknown(),
  verifiedFormat: z.unknown(),
  validatedSuffix: z.unknown(),
  measuredSizeBytes: z.bigint(),
  width: z.number().int(),
  height: z.number().int(),
  contentSha256: z.string(),
  validationProfile: z.string(),
  validatedAt: z.date(),
  uploadGrant: z.unknown(),
  organization: z.unknown(),
  lab: z.unknown(),
  dentalCase: z.unknown()
});