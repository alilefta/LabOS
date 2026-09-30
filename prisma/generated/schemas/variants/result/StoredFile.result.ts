import * as z from 'zod';
import { StoredFileProviderSchema } from '../../enums/StoredFileProvider.schema';
import { StoredFilePurposeSchema } from '../../enums/StoredFilePurpose.schema';
// prettier-ignore
export const StoredFileResultSchema = z.object({
    id: z.string(),
    organizationId: z.string(),
    labId: z.string(),
    sourceUploadGrantId: z.string(),
    provider: StoredFileProviderSchema,
    providerObjectKey: z.string(),
    purpose: StoredFilePurposeSchema,
    detectedMimeType: z.string(),
    sizeBytes: z.bigint(),
    checksumAlgorithm: z.string().nullable(),
    checksumValue: z.string().nullable(),
    uploaderMemberId: z.string().nullable(),
    uploaderMemberIdSnapshot: z.string(),
    createdAt: z.date(),
    organization: z.unknown(),
    lab: z.unknown(),
    sourceGrant: z.unknown(),
    uploaderMember: z.unknown().nullable(),
    caseVersion: z.unknown().nullable()
}).strict();

export type StoredFileResultType = z.infer<typeof StoredFileResultSchema>;
