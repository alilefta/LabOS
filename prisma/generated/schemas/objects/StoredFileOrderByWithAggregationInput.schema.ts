import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { StoredFileCountOrderByAggregateInputObjectSchema as StoredFileCountOrderByAggregateInputObjectSchema } from './StoredFileCountOrderByAggregateInput.schema';
import { StoredFileAvgOrderByAggregateInputObjectSchema as StoredFileAvgOrderByAggregateInputObjectSchema } from './StoredFileAvgOrderByAggregateInput.schema';
import { StoredFileMaxOrderByAggregateInputObjectSchema as StoredFileMaxOrderByAggregateInputObjectSchema } from './StoredFileMaxOrderByAggregateInput.schema';
import { StoredFileMinOrderByAggregateInputObjectSchema as StoredFileMinOrderByAggregateInputObjectSchema } from './StoredFileMinOrderByAggregateInput.schema';
import { StoredFileSumOrderByAggregateInputObjectSchema as StoredFileSumOrderByAggregateInputObjectSchema } from './StoredFileSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  organizationId: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional(),
  sourceUploadGrantId: SortOrderSchema.optional(),
  provider: SortOrderSchema.optional(),
  providerObjectKey: SortOrderSchema.optional(),
  purpose: SortOrderSchema.optional(),
  detectedMimeType: SortOrderSchema.optional(),
  sizeBytes: SortOrderSchema.optional(),
  checksumAlgorithm: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  checksumValue: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  uploaderMemberId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  uploaderMemberIdSnapshot: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  _count: z.lazy(() => StoredFileCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => StoredFileAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => StoredFileMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => StoredFileMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => StoredFileSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const StoredFileOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.StoredFileOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.StoredFileOrderByWithAggregationInput>;
export const StoredFileOrderByWithAggregationInputObjectZodSchema = makeSchema();
