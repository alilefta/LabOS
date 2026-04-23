import * as z from 'zod';
import { CaseActivityTypeSchema } from '../../enums/CaseActivityType.schema';
// prettier-ignore
export const CaseActivityLogModelSchema = z.object({
    id: z.string(),
    caseId: z.string(),
    dentalCase: z.unknown(),
    labId: z.string(),
    lab: z.unknown(),
    actorId: z.string().nullable(),
    actor: z.unknown().nullable(),
    actorName: z.string(),
    type: CaseActivityTypeSchema,
    summary: z.string(),
    payload: z.unknown().nullable(),
    createdAt: z.date()
}).strict();

export type CaseActivityLogPureType = z.infer<typeof CaseActivityLogModelSchema>;
