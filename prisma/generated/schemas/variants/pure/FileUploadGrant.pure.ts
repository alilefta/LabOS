import * as z from 'zod';
import { FileUploadGrantStatusSchema } from '../../enums/FileUploadGrantStatus.schema';
// prettier-ignore
export const FileUploadGrantModelSchema = z.object({
    id: z.string(),
    organizationId: z.string(),
    organization: z.unknown(),
    labId: z.string(),
    lab: z.unknown(),
    createdByMemberId: z.string().nullable(),
    createdByMember: z.unknown().nullable(),
    boundaryId: z.string(),
    purpose: z.string(),
    targetType: z.string().nullable(),
    targetId: z.string().nullable(),
    status: FileUploadGrantStatusSchema,
    providerFileKey: z.string().nullable(),
    providerFileUrl: z.string().nullable(),
    correlationId: z.string(),
    expiresAt: z.date(),
    uploadedAt: z.date().nullable(),
    consumedAt: z.date().nullable(),
    expiredAt: z.date().nullable(),
    failedAt: z.date().nullable(),
    failureCode: z.string().nullable(),
    providerDeletedAt: z.date().nullable(),
    cleanupAttemptCount: z.number().int(),
    lastCleanupAttemptAt: z.date().nullable(),
    cleanupFailureCode: z.string().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type FileUploadGrantPureType = z.infer<typeof FileUploadGrantModelSchema>;
