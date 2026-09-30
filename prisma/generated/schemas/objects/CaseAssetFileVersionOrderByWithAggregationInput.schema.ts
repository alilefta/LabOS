import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { CaseAssetFileVersionCountOrderByAggregateInputObjectSchema as CaseAssetFileVersionCountOrderByAggregateInputObjectSchema } from './CaseAssetFileVersionCountOrderByAggregateInput.schema';
import { CaseAssetFileVersionAvgOrderByAggregateInputObjectSchema as CaseAssetFileVersionAvgOrderByAggregateInputObjectSchema } from './CaseAssetFileVersionAvgOrderByAggregateInput.schema';
import { CaseAssetFileVersionMaxOrderByAggregateInputObjectSchema as CaseAssetFileVersionMaxOrderByAggregateInputObjectSchema } from './CaseAssetFileVersionMaxOrderByAggregateInput.schema';
import { CaseAssetFileVersionMinOrderByAggregateInputObjectSchema as CaseAssetFileVersionMinOrderByAggregateInputObjectSchema } from './CaseAssetFileVersionMinOrderByAggregateInput.schema';
import { CaseAssetFileVersionSumOrderByAggregateInputObjectSchema as CaseAssetFileVersionSumOrderByAggregateInputObjectSchema } from './CaseAssetFileVersionSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  caseAssetFileId: SortOrderSchema.optional(),
  organizationId: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional(),
  storedFileId: SortOrderSchema.optional(),
  versionNumber: SortOrderSchema.optional(),
  createdByMemberId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdByMemberIdSnapshot: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  _count: z.lazy(() => CaseAssetFileVersionCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => CaseAssetFileVersionAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => CaseAssetFileVersionMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => CaseAssetFileVersionMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => CaseAssetFileVersionSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const CaseAssetFileVersionOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.CaseAssetFileVersionOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileVersionOrderByWithAggregationInput>;
export const CaseAssetFileVersionOrderByWithAggregationInputObjectZodSchema = makeSchema();
