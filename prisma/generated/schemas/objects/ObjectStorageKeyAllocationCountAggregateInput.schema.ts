import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  objectKey: z.literal(true).optional(),
  sourceUploadGrantId: z.literal(true).optional(),
  latestWriteCapabilityExpiresAt: z.literal(true).optional(),
  allocatedAt: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const ObjectStorageKeyAllocationCountAggregateInputObjectSchema: z.ZodType<Prisma.ObjectStorageKeyAllocationCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ObjectStorageKeyAllocationCountAggregateInputType>;
export const ObjectStorageKeyAllocationCountAggregateInputObjectZodSchema = makeSchema();
