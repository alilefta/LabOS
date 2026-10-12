import * as z from 'zod';
export const ObjectStorageKeyAllocationUpsertResultSchema = z.object({
  objectKey: z.string(),
  sourceUploadGrantId: z.string(),
  latestWriteCapabilityExpiresAt: z.date().optional(),
  allocatedAt: z.date()
});