import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  dentalCaseId: SortOrderSchema.optional(),
  title: SortOrderSchema.optional(),
  description: SortOrderSchema.optional(),
  documentUrl: SortOrderSchema.optional(),
  assetFileType: SortOrderSchema.optional(),
  fileExtension: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const CaseAssetFileCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.CaseAssetFileCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileCountOrderByAggregateInput>;
export const CaseAssetFileCountOrderByAggregateInputObjectZodSchema = makeSchema();
