import * as z from 'zod';
export const ObjectStorageKeyAllocationFindFirstResultSchema = z.nullable(z.object({
  objectKey: z.string(),
  sourceUploadGrantId: z.string(),
  latestWriteCapabilityExpiresAt: z.date().optional(),
  allocatedAt: z.date()
}));