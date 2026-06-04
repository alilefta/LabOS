import * as z from 'zod';
export const CaseWorkItemAddonAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    caseWorkItemId: z.number(),
    caseWorkItem: z.number(),
    addonId: z.number(),
    addon: z.number(),
    priceSnapshot: z.number(),
    labId: z.number(),
    lab: z.number(),
    createdAt: z.number()
  }).optional(),
  _sum: z.object({
    priceSnapshot: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    priceSnapshot: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable(),
    caseWorkItemId: z.string().nullable(),
    addonId: z.string().nullable(),
    priceSnapshot: z.number().nullable(),
    labId: z.string().nullable(),
    createdAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    caseWorkItemId: z.string().nullable(),
    addonId: z.string().nullable(),
    priceSnapshot: z.number().nullable(),
    labId: z.string().nullable(),
    createdAt: z.date().nullable()
  }).nullable().optional()});