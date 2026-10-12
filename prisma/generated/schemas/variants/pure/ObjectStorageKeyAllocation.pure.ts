import * as z from 'zod';
// prettier-ignore
export const ObjectStorageKeyAllocationModelSchema = z.object({
    objectKey: z.string(),
    sourceUploadGrantId: z.string(),
    latestWriteCapabilityExpiresAt: z.date().nullable(),
    allocatedAt: z.date()
}).strict();

export type ObjectStorageKeyAllocationPureType = z.infer<typeof ObjectStorageKeyAllocationModelSchema>;
