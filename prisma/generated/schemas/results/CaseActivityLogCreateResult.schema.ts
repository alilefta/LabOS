import * as z from 'zod';
export const CaseActivityLogCreateResultSchema = z.object({
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
});