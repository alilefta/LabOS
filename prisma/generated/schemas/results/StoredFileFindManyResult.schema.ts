import * as z from 'zod';
export const StoredFileFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  organizationId: z.string(),
  labId: z.string(),
  sourceUploadGrantId: z.string(),
  provider: z.unknown(),
  providerObjectKey: z.string(),
  purpose: z.unknown(),
  detectedMimeType: z.string(),
  sizeBytes: z.bigint(),
  checksumAlgorithm: z.string().optional(),
  checksumValue: z.string().optional(),
  uploaderMemberId: z.string().optional(),
  uploaderMemberIdSnapshot: z.string(),
  createdAt: z.date(),
  organization: z.unknown(),
  lab: z.unknown(),
  sourceGrant: z.unknown(),
  uploaderMember: z.unknown().optional(),
  caseVersion: z.unknown().optional()
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