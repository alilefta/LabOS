import * as z from 'zod';
export const ObjectStorageKeyAllocationFindManyResultSchema = z.object({
  data: z.array(z.object({
  objectKey: z.string(),
  sourceUploadGrantId: z.string(),
  latestWriteCapabilityExpiresAt: z.date().optional(),
  allocatedAt: z.date()
})),
  pagination: z.object({
  page: z.number().int().min(1),
  pageSize: z.number().int().min(1),
  total: z.number().int().min(0),
  totalPages: z.number().int().min(0),
  hasNext: z.boolean(),
  hasPrev: z.boolean()
})
});