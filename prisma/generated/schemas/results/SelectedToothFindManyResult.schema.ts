import * as z from 'zod';
export const SelectedToothFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  toothPosition: z.unknown(),
  caseWorkItemId: z.string(),
  caseWorkItem: z.unknown(),
  labId: z.string(),
  Lab: z.unknown(),
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