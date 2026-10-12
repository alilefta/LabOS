import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  objectKey: SortOrderSchema.optional(),
  sourceUploadGrantId: SortOrderSchema.optional(),
  latestWriteCapabilityExpiresAt: SortOrderSchema.optional(),
  allocatedAt: SortOrderSchema.optional()
}).strict();
export const ObjectStorageKeyAllocationCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ObjectStorageKeyAllocationCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ObjectStorageKeyAllocationCountOrderByAggregateInput>;
export const ObjectStorageKeyAllocationCountOrderByAggregateInputObjectZodSchema = makeSchema();
