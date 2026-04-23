import * as z from 'zod';
export const CaseActivityLogFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  caseId: z.string(),
  dentalCase: z.unknown(),
  labId: z.string(),
  lab: z.unknown(),
  actorId: z.string().optional(),
  actor: z.unknown().optional(),
  actorName: z.string(),
  type: z.unknown(),
  summary: z.string(),
  payload: z.unknown().optional(),
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