import * as z from 'zod';

export const CaseActivityLogScalarFieldEnumSchema = z.enum(['id', 'caseId', 'labId', 'actorId', 'actorName', 'type', 'summary', 'payload', 'createdAt'])

export type CaseActivityLogScalarFieldEnum = z.infer<typeof CaseActivityLogScalarFieldEnumSchema>;