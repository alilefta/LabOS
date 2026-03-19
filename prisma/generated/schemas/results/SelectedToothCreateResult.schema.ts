import * as z from 'zod';
export const SelectedToothCreateResultSchema = z.object({
  id: z.string(),
  toothPosition: z.unknown(),
  caseWorkItemId: z.string(),
  caseWorkItem: z.unknown(),
  labId: z.string(),
  lab: z.unknown(),
  createdAt: z.date(),
  updatedAt: z.date()
});