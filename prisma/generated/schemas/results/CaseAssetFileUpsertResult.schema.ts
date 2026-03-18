import * as z from 'zod';
export const CaseAssetFileUpsertResultSchema = z.object({
  id: z.string(),
  caseId: z.string(),
  case: z.unknown(),
  title: z.string(),
  description: z.string(),
  documentUrl: z.string(),
  assetFileType: z.unknown(),
  labId: z.string(),
  Lab: z.unknown(),
  createdAt: z.date(),
  updatedAt: z.date()
});