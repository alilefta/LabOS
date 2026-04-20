import * as z from 'zod';
import { CaseActivityTypeSchema } from '../../enums/CaseActivityType.schema';
// prettier-ignore
export const CaseActivityLogInputSchema = z.object({
    id: z.string(),
    caseId: z.string(),
    dentalCase: z.unknown(),
    labId: z.string(),
    lab: z.unknown(),
    actorId: z.string().optional().nullable(),
    actorName: z.string(),
    type: CaseActivityTypeSchema,
    summary: z.string(),
    payload: z.unknown().optional().nullable(),
    createdAt: z.date()
}).strict();

export type CaseActivityLogInputType = z.infer<typeof CaseActivityLogInputSchema>;
