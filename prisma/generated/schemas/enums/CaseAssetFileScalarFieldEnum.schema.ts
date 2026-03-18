import * as z from 'zod';

export const CaseAssetFileScalarFieldEnumSchema = z.enum(['id', 'caseId', 'title', 'description', 'documentUrl', 'assetFileType', 'labId', 'createdAt', 'updatedAt'])

export type CaseAssetFileScalarFieldEnum = z.infer<typeof CaseAssetFileScalarFieldEnumSchema>;