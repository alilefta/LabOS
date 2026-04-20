import * as z from 'zod';
import { CaseActivityTypeSchema } from '../../enums/CaseActivityType.schema';
// prettier-ignore
export const CaseActivityLogResultSchema = z.object({
    id: z.string(),
    caseId: z.string(),
    case: z.unknown(),
    labId: z.string(),
    lab: z.unknown(),
    actorId: z.string().nullable(),
    actorName: z.string(),
    type: CaseActivityTypeSchema,
    summary: z.string(),
    payload: z.unknown().nullable(),
    createdAt: z.date()
}).strict();

export type CaseActivityLogResultType = z.infer<typeof CaseActivityLogResultSchema>;
