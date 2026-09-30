import * as z from 'zod';
export const CaseFileAccessAuditGroupByResultSchema = z.array(z.object({
  id: z.string(),
  organizationId: z.string(),
  labId: z.string(),
  actorMemberId: z.string(),
  caseId: z.string(),
  caseAssetFileId: z.string(),
  correlationId: z.string(),
  issuedAt: z.date(),
  expiresAt: z.date(),
  createdAt: z.date(),
  _count: z.object({
    id: z.number(),
    organizationId: z.number(),
    labId: z.number(),
    actorMemberId: z.number(),
    caseId: z.number(),
    caseAssetFileId: z.number(),
    authorizationOutcome: z.number(),
    issuanceOutcome: z.number(),
    reason: z.number(),
    correlationId: z.number(),
    issuedAt: z.number(),
    expiresAt: z.number(),
    createdAt: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    organizationId: z.string().nullable(),
    labId: z.string().nullable(),
    actorMemberId: z.string().nullable(),
    caseId: z.string().nullable(),
    caseAssetFileId: z.string().nullable(),
    correlationId: z.string().nullable(),
    issuedAt: z.date().nullable(),
    expiresAt: z.date().nullable(),
    createdAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    organizationId: z.string().nullable(),
    labId: z.string().nullable(),
    actorMemberId: z.string().nullable(),
    caseId: z.string().nullable(),
    caseAssetFileId: z.string().nullable(),
    correlationId: z.string().nullable(),
    issuedAt: z.date().nullable(),
    expiresAt: z.date().nullable(),
    createdAt: z.date().nullable()
  }).nullable().optional()
}));