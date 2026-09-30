import * as z from 'zod';
export const CaseClinicalUploadEvidenceFindManyResultSchema = z.object({
  data: z.array(z.object({
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
})),
  pagination: z.object({
  page: z.number().int().min(1),
  pageSize: z.number().int().min(1),
  total: z.number().int().min(0),
  totalPages: z.number().int().min(0),
  hasNext: z.boolean(),
  hasPrev: z.boolean()
})
});