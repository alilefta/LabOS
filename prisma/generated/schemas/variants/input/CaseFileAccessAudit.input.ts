import * as z from 'zod';
import { CaseFileAuthorizationOutcomeSchema } from '../../enums/CaseFileAuthorizationOutcome.schema';
import { CaseFileIssuanceOutcomeSchema } from '../../enums/CaseFileIssuanceOutcome.schema';
import { CaseFileAccessReasonSchema } from '../../enums/CaseFileAccessReason.schema';
// prettier-ignore
export const CaseFileAccessAuditInputSchema = z.object({
    id: z.string(),
    organizationId: z.string(),
    labId: z.string(),
    actorMemberId: z.string(),
    caseId: z.string().optional().nullable(),
    caseAssetFileId: z.string().optional().nullable(),
    authorizationOutcome: CaseFileAuthorizationOutcomeSchema,
    issuanceOutcome: CaseFileIssuanceOutcomeSchema,
    reason: CaseFileAccessReasonSchema,
    correlationId: z.string(),
    issuedAt: z.date().optional().nullable(),
    expiresAt: z.date().optional().nullable(),
    createdAt: z.date()
}).strict();

export type CaseFileAccessAuditInputType = z.infer<typeof CaseFileAccessAuditInputSchema>;
