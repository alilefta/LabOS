import * as z from 'zod';
export const CaseAssetFileFindManyResultSchema = z.object({
  data: z.array(z.object({
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