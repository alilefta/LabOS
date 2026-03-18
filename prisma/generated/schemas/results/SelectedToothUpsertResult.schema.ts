import * as z from 'zod';
export const SelectedToothUpsertResultSchema = z.object({
  id: z.string(),
  toothPosition: z.unknown(),
  caseWorkItemId: z.string(),
  caseWorkItem: z.unknown(),
  labId: z.string(),
  Lab: z.unknown(),
  createdAt: z.date(),
  updatedAt: z.date()
});