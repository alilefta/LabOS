import * as z from 'zod';
export const StoredFileUpsertResultSchema = z.object({
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
});