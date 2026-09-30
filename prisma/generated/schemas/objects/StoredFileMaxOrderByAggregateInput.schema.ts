import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

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
  checksumAlgorithm: SortOrderSchema.optional(),
  checksumValue: SortOrderSchema.optional(),
  uploaderMemberId: SortOrderSchema.optional(),
  uploaderMemberIdSnapshot: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional()
}).strict();
export const StoredFileMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.StoredFileMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.StoredFileMaxOrderByAggregateInput>;
export const StoredFileMaxOrderByAggregateInputObjectZodSchema = makeSchema();
