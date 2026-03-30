import * as z from 'zod';
export const WorkTypeAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    name: z.number(),
    description: z.number(),
    imageUrl: z.number(),
    products: z.number(),
    labId: z.number(),
    lab: z.number(),
    requireTeethSelection: z.number(),
    caseWorkItems: z.number(),
    caseCategoryId: z.number(),
    caseCategory: z.number(),
    createdAt: z.number(),
    updatedAt: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    name: z.string().nullable(),
    description: z.string().nullable(),
    imageUrl: z.string().nullable(),
    labId: z.string().nullable(),
    caseCategoryId: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    name: z.string().nullable(),
    description: z.string().nullable(),
    imageUrl: z.string().nullable(),
    labId: z.string().nullable(),
    caseCategoryId: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()});