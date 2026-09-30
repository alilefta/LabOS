import * as z from 'zod';
import { CaseFileAuthorizationOutcomeSchema } from '../../enums/CaseFileAuthorizationOutcome.schema';
import { CaseFileIssuanceOutcomeSchema } from '../../enums/CaseFileIssuanceOutcome.schema';
import { CaseFileAccessReasonSchema } from '../../enums/CaseFileAccessReason.schema';
// prettier-ignore
export const CaseFileAccessAuditModelSchema = z.object({
    id: z.string(),
    organizationId: z.string(),
    labId: z.string(),
    actorMemberId: z.string(),
    caseId: z.string().nullable(),
    caseAssetFileId: z.string().nullable(),
    authorizationOutcome: CaseFileAuthorizationOutcomeSchema,
    issuanceOutcome: CaseFileIssuanceOutcomeSchema,
    reason: CaseFileAccessReasonSchema,
    correlationId: z.string(),
    issuedAt: z.date().nullable(),
    expiresAt: z.date().nullable(),
    createdAt: z.date()
}).strict();

export type CaseFileAccessAuditPureType = z.infer<typeof CaseFileAccessAuditModelSchema>;
