import * as z from 'zod';
export const CaseWorkItemAddonUpsertResultSchema = z.object({
  id: z.string(),
  caseWorkItemId: z.string(),
  caseWorkItem: z.unknown(),
  addonId: z.string(),
  addon: z.unknown(),
  priceSnapshot: z.number(),
  labId: z.string(),
  lab: z.unknown(),
  createdAt: z.date()
});