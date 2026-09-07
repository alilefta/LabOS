import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { FileUploadGrantCountOrderByAggregateInputObjectSchema as FileUploadGrantCountOrderByAggregateInputObjectSchema } from './FileUploadGrantCountOrderByAggregateInput.schema';
import { FileUploadGrantAvgOrderByAggregateInputObjectSchema as FileUploadGrantAvgOrderByAggregateInputObjectSchema } from './FileUploadGrantAvgOrderByAggregateInput.schema';
import { FileUploadGrantMaxOrderByAggregateInputObjectSchema as FileUploadGrantMaxOrderByAggregateInputObjectSchema } from './FileUploadGrantMaxOrderByAggregateInput.schema';
import { FileUploadGrantMinOrderByAggregateInputObjectSchema as FileUploadGrantMinOrderByAggregateInputObjectSchema } from './FileUploadGrantMinOrderByAggregateInput.schema';
import { FileUploadGrantSumOrderByAggregateInputObjectSchema as FileUploadGrantSumOrderByAggregateInputObjectSchema } from './FileUploadGrantSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  organizationId: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional(),
  createdByMemberId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  boundaryId: SortOrderSchema.optional(),
  purpose: SortOrderSchema.optional(),
  targetType: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  targetId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  status: SortOrderSchema.optional(),
  providerFileKey: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  providerFileUrl: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  correlationId: SortOrderSchema.optional(),
  expiresAt: SortOrderSchema.optional(),
  uploadedAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  consumedAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  expiredAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  failedAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  failureCode: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  providerDeletedAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  cleanupAttemptCount: SortOrderSchema.optional(),
  lastCleanupAttemptAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  cleanupFailureCode: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => FileUploadGrantCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => FileUploadGrantAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => FileUploadGrantMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => FileUploadGrantMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => FileUploadGrantSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const FileUploadGrantOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.FileUploadGrantOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.FileUploadGrantOrderByWithAggregationInput>;
export const FileUploadGrantOrderByWithAggregationInputObjectZodSchema = makeSchema();
