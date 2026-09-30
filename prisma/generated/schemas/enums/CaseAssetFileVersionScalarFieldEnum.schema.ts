import * as z from 'zod';

export const CaseAssetFileVersionScalarFieldEnumSchema = z.enum(['id', 'caseAssetFileId', 'organizationId', 'labId', 'storedFileId', 'versionNumber', 'createdByMemberId', 'createdByMemberIdSnapshot', 'createdAt'])

export type CaseAssetFileVersionScalarFieldEnum = z.infer<typeof CaseAssetFileVersionScalarFieldEnumSchema>;