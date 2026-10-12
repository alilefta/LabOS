import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { ObjectStorageKeyAllocationCountOrderByAggregateInputObjectSchema as ObjectStorageKeyAllocationCountOrderByAggregateInputObjectSchema } from './ObjectStorageKeyAllocationCountOrderByAggregateInput.schema';
import { ObjectStorageKeyAllocationMaxOrderByAggregateInputObjectSchema as ObjectStorageKeyAllocationMaxOrderByAggregateInputObjectSchema } from './ObjectStorageKeyAllocationMaxOrderByAggregateInput.schema';
import { ObjectStorageKeyAllocationMinOrderByAggregateInputObjectSchema as ObjectStorageKeyAllocationMinOrderByAggregateInputObjectSchema } from './ObjectStorageKeyAllocationMinOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  objectKey: SortOrderSchema.optional(),
  sourceUploadGrantId: SortOrderSchema.optional(),
  latestWriteCapabilityExpiresAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  allocatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => ObjectStorageKeyAllocationCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => ObjectStorageKeyAllocationMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => ObjectStorageKeyAllocationMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const ObjectStorageKeyAllocationOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.ObjectStorageKeyAllocationOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.ObjectStorageKeyAllocationOrderByWithAggregationInput>;
export const ObjectStorageKeyAllocationOrderByWithAggregationInputObjectZodSchema = makeSchema();
