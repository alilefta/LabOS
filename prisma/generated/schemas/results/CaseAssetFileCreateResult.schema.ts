import * as z from 'zod';
export const CaseAssetFileCreateResultSchema = z.object({
  id: z.string(),
  dentalCaseId: z.string(),
  dentalCase: z.unknown(),
  title: z.string().optional(),
  description: z.string().optional(),
  documentUrl: z.string().optional(),
  assetFileType: z.unknown(),
  fileExtension: z.string().optional(),
  labId: z.string(),
  lab: z.unknown(),
  storageMode: z.unknown(),
  clinicalPurpose: z.unknown().optional(),
  currentVersionId: z.string().optional(),
  versions: z.array(z.unknown()),
  currentVersion: z.unknown().optional(),
  createdAt: z.date(),
  updatedAt: z.date()
});