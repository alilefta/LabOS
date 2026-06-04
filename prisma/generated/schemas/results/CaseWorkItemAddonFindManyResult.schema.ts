import * as z from 'zod';
export const CaseWorkItemAddonFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  caseWorkItemId: z.string(),
  caseWorkItem: z.unknown(),
  addonId: z.string(),
  addon: z.unknown(),
  priceSnapshot: z.number(),
  labId: z.string(),
  lab: z.unknown(),
  createdAt: z.date()
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