import * as z from 'zod';
export const CaseAssetFileGroupByResultSchema = z.array(z.object({
  id: z.string(),
  dentalCaseId: z.string(),
  title: z.string(),
  description: z.string(),
  documentUrl: z.string(),
  fileExtension: z.string(),
  labId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  _count: z.object({
    id: z.number(),
    dentalCaseId: z.number(),
    dentalCase: z.number(),
    title: z.number(),
    description: z.number(),
    documentUrl: z.number(),
    assetFileType: z.number(),
    fileExtension: z.number(),
    labId: z.number(),
    lab: z.number(),
    createdAt: z.number(),
    updatedAt: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    dentalCaseId: z.string().nullable(),
    title: z.string().nullable(),
    description: z.string().nullable(),
    documentUrl: z.string().nullable(),
    fileExtension: z.string().nullable(),
    labId: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    dentalCaseId: z.string().nullable(),
    title: z.string().nullable(),
    description: z.string().nullable(),
    documentUrl: z.string().nullable(),
    fileExtension: z.string().nullable(),
    labId: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()
}));