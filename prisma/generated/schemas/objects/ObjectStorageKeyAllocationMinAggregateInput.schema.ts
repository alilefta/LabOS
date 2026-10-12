import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  objectKey: z.literal(true).optional(),
  sourceUploadGrantId: z.literal(true).optional(),
  latestWriteCapabilityExpiresAt: z.literal(true).optional(),
  allocatedAt: z.literal(true).optional()
}).strict();
export const ObjectStorageKeyAllocationMinAggregateInputObjectSchema: z.ZodType<Prisma.ObjectStorageKeyAllocationMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ObjectStorageKeyAllocationMinAggregateInputType>;
export const ObjectStorageKeyAllocationMinAggregateInputObjectZodSchema = makeSchema();
