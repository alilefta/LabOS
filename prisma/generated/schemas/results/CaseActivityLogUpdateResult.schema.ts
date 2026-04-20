import * as z from 'zod';
export const CaseActivityLogUpdateResultSchema = z.nullable(z.object({
  id: z.string(),
  caseId: z.string(),
  dentalCase: z.unknown(),
  labId: z.string(),
  lab: z.unknown(),
  actorId: z.string().optional(),
  actorName: z.string(),
  type: z.unknown(),
  summary: z.string(),
  payload: z.unknown().optional(),
  createdAt: z.date()
}));