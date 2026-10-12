import * as z from 'zod';
// prettier-ignore
export const ObjectStorageKeyAllocationInputSchema = z.object({
    objectKey: z.string(),
    sourceUploadGrantId: z.string(),
    latestWriteCapabilityExpiresAt: z.date().optional().nullable(),
    allocatedAt: z.date()
}).strict();

export type ObjectStorageKeyAllocationInputType = z.infer<typeof ObjectStorageKeyAllocationInputSchema>;
