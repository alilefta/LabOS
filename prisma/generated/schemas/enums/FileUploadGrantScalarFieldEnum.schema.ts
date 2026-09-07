import * as z from 'zod';

export const FileUploadGrantScalarFieldEnumSchema = z.enum(['id', 'organizationId', 'labId', 'createdByMemberId', 'boundaryId', 'purpose', 'targetType', 'targetId', 'status', 'providerFileKey', 'providerFileUrl', 'correlationId', 'expiresAt', 'uploadedAt', 'consumedAt', 'expiredAt', 'failedAt', 'failureCode', 'providerDeletedAt', 'cleanupAttemptCount', 'lastCleanupAttemptAt', 'cleanupFailureCode', 'createdAt', 'updatedAt'])

export type FileUploadGrantScalarFieldEnum = z.infer<typeof FileUploadGrantScalarFieldEnumSchema>;