import * as z from 'zod';
export const SelectedToothGroupByResultSchema = z.array(z.object({
  id: z.string(),
  caseWorkItemId: z.string(),
  labId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  _count: z.object({
    id: z.number(),
    toothPosition: z.number(),
    caseWorkItemId: z.number(),
    caseWorkItem: z.number(),
    labId: z.number(),
    Lab: z.number(),
    createdAt: z.number(),
    updatedAt: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    caseWorkItemId: z.string().nullable(),
    labId: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    caseWorkItemId: z.string().nullable(),
    labId: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()
}));