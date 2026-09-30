import * as z from 'zod';
export const CaseFileAccessAuditFindManyResultSchema = z.object({
  data: z.array(z.object({
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