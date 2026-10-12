import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  objectKey: SortOrderSchema.optional(),
  sourceUploadGrantId: SortOrderSchema.optional(),
  latestWriteCapabilityExpiresAt: SortOrderSchema.optional(),
  allocatedAt: SortOrderSchema.optional()
}).strict();
export const ObjectStorageKeyAllocationMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ObjectStorageKeyAllocationMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ObjectStorageKeyAllocationMaxOrderByAggregateInput>;
export const ObjectStorageKeyAllocationMaxOrderByAggregateInputObjectZodSchema = makeSchema();
