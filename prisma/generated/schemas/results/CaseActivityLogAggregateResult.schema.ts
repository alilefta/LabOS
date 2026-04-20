import * as z from 'zod';
export const CaseActivityLogAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    caseId: z.number(),
    case: z.number(),
    labId: z.number(),
    lab: z.number(),
    actorId: z.number(),
    actorName: z.number(),
    type: z.number(),
    summary: z.number(),
    payload: z.number(),
    createdAt: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    caseId: z.string().nullable(),
    labId: z.string().nullable(),
    actorId: z.string().nullable(),
    actorName: z.string().nullable(),
    summary: z.string().nullable(),
    createdAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    caseId: z.string().nullable(),
    labId: z.string().nullable(),
    actorId: z.string().nullable(),
    actorName: z.string().nullable(),
    summary: z.string().nullable(),
    createdAt: z.date().nullable()
  }).nullable().optional()});