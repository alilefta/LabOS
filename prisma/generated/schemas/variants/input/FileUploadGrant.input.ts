import * as z from 'zod';
import { FileUploadGrantStatusSchema } from '../../enums/FileUploadGrantStatus.schema';
import { StoredFileProviderSchema } from '../../enums/StoredFileProvider.schema';
// prettier-ignore
export const FileUploadGrantInputSchema = z.object({
    id: z.string(),
    organizationId: z.string(),
    organization: z.unknown(),
    labId: z.string(),
    lab: z.unknown(),
    createdByMemberId: z.string().optional().nullable(),
    createdByMember: z.unknown().optional().nullable(),
    boundaryId: z.string(),
    purpose: z.string(),
    targetType: z.string().optional().nullable(),
    targetId: z.string().optional().nullable(),
    status: FileUploadGrantStatusSchema,
    provider: StoredFileProviderSchema.optional().nullable(),
    providerFileKey: z.string().optional().nullable(),
    providerFileUrl: z.string().optional().nullable(),
    correlationId: z.string(),
    expiresAt: z.date(),
    uploadedAt: z.date().optional().nullable(),
    consumedAt: z.date().optional().nullable(),
    expiredAt: z.date().optional().nullable(),
    failedAt: z.date().optional().nullable(),
    failureCode: z.string().optional().nullable(),
    providerDeletedAt: z.date().optional().nullable(),
    cleanupAttemptCount: z.number().int(),
    lastCleanupAttemptAt: z.date().optional().nullable(),
    cleanupFailureCode: z.string().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    storedFile: z.unknown().optional().nullable(),
    clinicalUploadEvidence: z.unknown().optional().nullable()
}).strict();

export type FileUploadGrantInputType = z.infer<typeof FileUploadGrantInputSchema>;
