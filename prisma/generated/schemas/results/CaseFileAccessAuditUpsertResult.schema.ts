import * as z from 'zod';
export const CaseFileAccessAuditUpsertResultSchema = z.object({
  id: z.string(),
  organizationId: z.string(),
  labId: z.string(),
  actorMemberId: z.string(),
  caseId: z.string().optional(),
  caseAssetFileId: z.string().optional(),
  authorizationOutcome: z.unknown(),
  issuanceOutcome: z.unknown(),
  reason: z.unknown(),
  correlationId: z.string(),
  issuedAt: z.date().optional(),
  expiresAt: z.date().optional(),
  createdAt: z.date()
});