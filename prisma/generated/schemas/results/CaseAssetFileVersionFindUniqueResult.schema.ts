import * as z from 'zod';
export const CaseAssetFileVersionFindUniqueResultSchema = z.nullable(z.object({
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
}));