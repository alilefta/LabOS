import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  caseId: SortOrderSchema.optional(),
  title: SortOrderSchema.optional(),
  description: SortOrderSchema.optional(),
  documentUrl: SortOrderSchema.optional(),
  assetFileType: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const CaseAssetFileMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.CaseAssetFileMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileMinOrderByAggregateInput>;
export const CaseAssetFileMinOrderByAggregateInputObjectZodSchema = makeSchema();
