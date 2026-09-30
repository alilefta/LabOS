import * as z from 'zod';
export const CaseClinicalUploadEvidenceGroupByResultSchema = z.array(z.object({
  uploadGrantId: z.string(),
  organizationId: z.string(),
  labId: z.string(),
  caseId: z.string(),
  providerObjectKey: z.string(),
  measuredSizeBytes: z.bigint(),
  width: z.number().int(),
  height: z.number().int(),
  contentSha256: z.string(),
  validationProfile: z.string(),
  validatedAt: z.date(),
  _count: z.object({
    uploadGrantId: z.number(),
    organizationId: z.number(),
    labId: z.number(),
    caseId: z.number(),
    provider: z.number(),
    providerObjectKey: z.number(),
    clinicalPurpose: z.number(),
    verifiedFormat: z.number(),
    validatedSuffix: z.number(),
    measuredSizeBytes: z.number(),
    width: z.number(),
    height: z.number(),
    contentSha256: z.number(),
    validationProfile: z.number(),
    validatedAt: z.number(),
    uploadGrant: z.number(),
    organization: z.number(),
    lab: z.number(),
    dentalCase: z.number()
  }).optional(),
  _sum: z.object({
    measuredSizeBytes: z.bigint().nullable(),
    width: z.number().nullable(),
    height: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    measuredSizeBytes: z.number().nullable(),
    width: z.number().nullable(),
    height: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    uploadGrantId: z.string().nullable(),
    organizationId: z.string().nullable(),
    labId: z.string().nullable(),
    caseId: z.string().nullable(),
    providerObjectKey: z.string().nullable(),
    measuredSizeBytes: z.bigint().nullable(),
    width: z.number().int().nullable(),
    height: z.number().int().nullable(),
    contentSha256: z.string().nullable(),
    validationProfile: z.string().nullable(),
    validatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    uploadGrantId: z.string().nullable(),
    organizationId: z.string().nullable(),
    labId: z.string().nullable(),
    caseId: z.string().nullable(),
    providerObjectKey: z.string().nullable(),
    measuredSizeBytes: z.bigint().nullable(),
    width: z.number().int().nullable(),
    height: z.number().int().nullable(),
    contentSha256: z.string().nullable(),
    validationProfile: z.string().nullable(),
    validatedAt: z.date().nullable()
  }).nullable().optional()
}));