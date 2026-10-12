import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  objectKey: z.boolean().optional(),
  sourceUploadGrantId: z.boolean().optional(),
  latestWriteCapabilityExpiresAt: z.boolean().optional(),
  allocatedAt: z.boolean().optional()
}).strict();
export const ObjectStorageKeyAllocationSelectObjectSchema: z.ZodType<Prisma.ObjectStorageKeyAllocationSelect> = makeSchema() as unknown as z.ZodType<Prisma.ObjectStorageKeyAllocationSelect>;
export const ObjectStorageKeyAllocationSelectObjectZodSchema = makeSchema();
