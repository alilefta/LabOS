import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { ProductAddonCountOrderByAggregateInputObjectSchema as ProductAddonCountOrderByAggregateInputObjectSchema } from './ProductAddonCountOrderByAggregateInput.schema';
import { ProductAddonAvgOrderByAggregateInputObjectSchema as ProductAddonAvgOrderByAggregateInputObjectSchema } from './ProductAddonAvgOrderByAggregateInput.schema';
import { ProductAddonMaxOrderByAggregateInputObjectSchema as ProductAddonMaxOrderByAggregateInputObjectSchema } from './ProductAddonMaxOrderByAggregateInput.schema';
import { ProductAddonMinOrderByAggregateInputObjectSchema as ProductAddonMinOrderByAggregateInputObjectSchema } from './ProductAddonMinOrderByAggregateInput.schema';
import { ProductAddonSumOrderByAggregateInputObjectSchema as ProductAddonSumOrderByAggregateInputObjectSchema } from './ProductAddonSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  productId: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  price: SortOrderSchema.optional(),
  isArchived: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => ProductAddonCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => ProductAddonAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => ProductAddonMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => ProductAddonMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => ProductAddonSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const ProductAddonOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.ProductAddonOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductAddonOrderByWithAggregationInput>;
export const ProductAddonOrderByWithAggregationInputObjectZodSchema = makeSchema();
