import * as z from 'zod';
export const CaseAssetFileVersionFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  caseAssetFileId: z.string(),
  organizationId: z.string(),
  labId: z.string(),
  storedFileId: z.string(),
  versionNumber: z.number().int(),
  createdByMemberId: z.string().optional(),
  createdByMemberIdSnapshot: z.string(),
  createdAt: z.date(),
  asset: z.unknown(),
  storedFile: z.unknown(),
  createdByMember: z.unknown().optional(),
  currentForAsset: z.unknown().optional()
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