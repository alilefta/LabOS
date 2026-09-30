import * as z from 'zod';
import { StoredFileProviderSchema } from '../../enums/StoredFileProvider.schema';
import { StoredFilePurposeSchema } from '../../enums/StoredFilePurpose.schema';
// prettier-ignore
export const StoredFileInputSchema = z.object({
    id: z.string(),
    organizationId: z.string(),
    labId: z.string(),
    sourceUploadGrantId: z.string(),
    provider: StoredFileProviderSchema,
    providerObjectKey: z.string(),
    purpose: StoredFilePurposeSchema,
    detectedMimeType: z.string(),
    sizeBytes: z.bigint(),
    checksumAlgorithm: z.string().optional().nullable(),
    checksumValue: z.string().optional().nullable(),
    uploaderMemberId: z.string().optional().nullable(),
    uploaderMemberIdSnapshot: z.string(),
    createdAt: z.date(),
    organization: z.unknown(),
    lab: z.unknown(),
    sourceGrant: z.unknown(),
    uploaderMember: z.unknown().optional().nullable(),
    caseVersion: z.unknown().optional().nullable()
}).strict();

export type StoredFileInputType = z.infer<typeof StoredFileInputSchema>;
