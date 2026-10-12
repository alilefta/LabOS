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
  validatorVersion: z.string().optional(),
  codecBackend: z.unknown().optional(),
  codecPackageVersion: z.string().optional(),
  codecLibraryVersion: z.string().optional(),
  codecRuntimeSha256: z.string().optional(),
  sourceComponents: z.number().int().optional(),
  isProgressive: z.boolean().optional(),
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