import * as z from 'zod';
export const CaseAssetFileAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    caseId: z.number(),
    case: z.number(),
    title: z.number(),
    description: z.number(),
    documentUrl: z.number(),
    assetFileType: z.number(),
    labId: z.number(),
    Lab: z.number(),
    createdAt: z.number(),
    updatedAt: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    caseId: z.string().nullable(),
    title: z.string().nullable(),
    description: z.string().nullable(),
    documentUrl: z.string().nullable(),
    labId: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    caseId: z.string().nullable(),
    title: z.string().nullable(),
    description: z.string().nullable(),
    documentUrl: z.string().nullable(),
    labId: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()});