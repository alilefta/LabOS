import * as z from 'zod';
export const ObjectStorageKeyAllocationGroupByResultSchema = z.array(z.object({
  objectKey: z.string(),
  sourceUploadGrantId: z.string(),
  latestWriteCapabilityExpiresAt: z.date(),
  allocatedAt: z.date(),
  _count: z.object({
    objectKey: z.number(),
    sourceUploadGrantId: z.number(),
    latestWriteCapabilityExpiresAt: z.number(),
    allocatedAt: z.number()
  }).optional(),
  _min: z.object({
    objectKey: z.string().nullable(),
    sourceUploadGrantId: z.string().nullable(),
    latestWriteCapabilityExpiresAt: z.date().nullable(),
    allocatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    objectKey: z.string().nullable(),
    sourceUploadGrantId: z.string().nullable(),
    latestWriteCapabilityExpiresAt: z.date().nullable(),
    allocatedAt: z.date().nullable()
  }).nullable().optional()
}));