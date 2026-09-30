import * as z from 'zod';

export const CaseFileAccessAuditScalarFieldEnumSchema = z.enum(['id', 'organizationId', 'labId', 'actorMemberId', 'caseId', 'caseAssetFileId', 'authorizationOutcome', 'issuanceOutcome', 'reason', 'correlationId', 'issuedAt', 'expiresAt', 'createdAt'])

export type CaseFileAccessAuditScalarFieldEnum = z.infer<typeof CaseFileAccessAuditScalarFieldEnumSchema>;