import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { CaseCategoryCountOrderByAggregateInputObjectSchema as CaseCategoryCountOrderByAggregateInputObjectSchema } from './CaseCategoryCountOrderByAggregateInput.schema';
import { CaseCategoryMaxOrderByAggregateInputObjectSchema as CaseCategoryMaxOrderByAggregateInputObjectSchema } from './CaseCategoryMaxOrderByAggregateInput.schema';
import { CaseCategoryMinOrderByAggregateInputObjectSchema as CaseCategoryMinOrderByAggregateInputObjectSchema } from './CaseCategoryMinOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  description: SortOrderSchema.optional(),
  imageUrl: SortOrderSchema.optional(),
  isActive: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => CaseCategoryCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => CaseCategoryMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => CaseCategoryMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const CaseCategoryOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.CaseCategoryOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseCategoryOrderByWithAggregationInput>;
export const CaseCategoryOrderByWithAggregationInputObjectZodSchema = makeSchema();
