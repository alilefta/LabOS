import * as z from 'zod';
export const CaseAssetFileUpsertResultSchema = z.object({
  id: z.string(),
  dentalCaseId: z.string(),
  dentalCase: z.unknown(),
  title: z.string(),
  description: z.string(),
  documentUrl: z.string(),
  assetFileType: z.unknown(),
  labId: z.string(),
  lab: z.unknown(),
  createdAt: z.date(),
  updatedAt: z.date()
});