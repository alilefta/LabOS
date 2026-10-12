import * as z from 'zod';

export const ObjectStorageKeyAllocationScalarFieldEnumSchema = z.enum(['objectKey', 'sourceUploadGrantId', 'latestWriteCapabilityExpiresAt', 'allocatedAt'])

export type ObjectStorageKeyAllocationScalarFieldEnum = z.infer<typeof ObjectStorageKeyAllocationScalarFieldEnumSchema>;