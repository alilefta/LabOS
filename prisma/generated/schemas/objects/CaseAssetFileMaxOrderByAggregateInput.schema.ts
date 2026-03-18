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
export const CaseAssetFileMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.CaseAssetFileMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileMaxOrderByAggregateInput>;
export const CaseAssetFileMaxOrderByAggregateInputObjectZodSchema = makeSchema();
