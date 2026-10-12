import * as z from 'zod';
// prettier-ignore
export const ObjectStorageKeyAllocationResultSchema = z.object({
    objectKey: z.string(),
    sourceUploadGrantId: z.string(),
    latestWriteCapabilityExpiresAt: z.date().nullable(),
    allocatedAt: z.date()
}).strict();

export type ObjectStorageKeyAllocationResultType = z.infer<typeof ObjectStorageKeyAllocationResultSchema>;
