import * as z from 'zod';
export const ObjectStorageKeyAllocationCreateResultSchema = z.object({
  objectKey: z.string(),
  sourceUploadGrantId: z.string(),
  latestWriteCapabilityExpiresAt: z.date().optional(),
  allocatedAt: z.date()
});