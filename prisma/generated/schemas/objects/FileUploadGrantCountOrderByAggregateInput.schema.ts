import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  organizationId: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional(),
  createdByMemberId: SortOrderSchema.optional(),
  boundaryId: SortOrderSchema.optional(),
  purpose: SortOrderSchema.optional(),
  targetType: SortOrderSchema.optional(),
  targetId: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  providerFileKey: SortOrderSchema.optional(),
  providerFileUrl: SortOrderSchema.optional(),
  correlationId: SortOrderSchema.optional(),
  expiresAt: SortOrderSchema.optional(),
  uploadedAt: SortOrderSchema.optional(),
  consumedAt: SortOrderSchema.optional(),
  expiredAt: SortOrderSchema.optional(),
  failedAt: SortOrderSchema.optional(),
  failureCode: SortOrderSchema.optional(),
  providerDeletedAt: SortOrderSchema.optional(),
  cleanupAttemptCount: SortOrderSchema.optional(),
  lastCleanupAttemptAt: SortOrderSchema.optional(),
  cleanupFailureCode: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const FileUploadGrantCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.FileUploadGrantCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.FileUploadGrantCountOrderByAggregateInput>;
export const FileUploadGrantCountOrderByAggregateInputObjectZodSchema = makeSchema();
