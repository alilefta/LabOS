import * as z from 'zod';

export const StoredFileScalarFieldEnumSchema = z.enum(['id', 'organizationId', 'labId', 'sourceUploadGrantId', 'provider', 'providerObjectKey', 'purpose', 'detectedMimeType', 'sizeBytes', 'checksumAlgorithm', 'checksumValue', 'uploaderMemberId', 'uploaderMemberIdSnapshot', 'createdAt'])

export type StoredFileScalarFieldEnum = z.infer<typeof StoredFileScalarFieldEnumSchema>;