import * as z from 'zod';
export const CaseAssetFileFindFirstResultSchema = z.nullable(z.object({
  id: z.string(),
  dentalCaseId: z.string(),
  dentalCase: z.unknown(),
  title: z.string().optional(),
  description: z.string().optional(),
  documentUrl: z.string(),
  assetFileType: z.unknown(),
  fileExtension: z.string(),
  labId: z.string(),
  lab: z.unknown(),
  createdAt: z.date(),
  updatedAt: z.date()
}));