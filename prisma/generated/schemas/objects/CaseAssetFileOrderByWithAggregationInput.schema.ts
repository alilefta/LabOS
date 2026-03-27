import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { CaseAssetFileCountOrderByAggregateInputObjectSchema as CaseAssetFileCountOrderByAggregateInputObjectSchema } from './CaseAssetFileCountOrderByAggregateInput.schema';
import { CaseAssetFileMaxOrderByAggregateInputObjectSchema as CaseAssetFileMaxOrderByAggregateInputObjectSchema } from './CaseAssetFileMaxOrderByAggregateInput.schema';
import { CaseAssetFileMinOrderByAggregateInputObjectSchema as CaseAssetFileMinOrderByAggregateInputObjectSchema } from './CaseAssetFileMinOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  dentalCaseId: SortOrderSchema.optional(),
  title: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  description: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  documentUrl: SortOrderSchema.optional(),
  assetFileType: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => CaseAssetFileCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => CaseAssetFileMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => CaseAssetFileMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const CaseAssetFileOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.CaseAssetFileOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileOrderByWithAggregationInput>;
export const CaseAssetFileOrderByWithAggregationInputObjectZodSchema = makeSchema();
