import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  productId: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  price: SortOrderSchema.optional(),
  isArchived: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const ProductAddonMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ProductAddonMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductAddonMinOrderByAggregateInput>;
export const ProductAddonMinOrderByAggregateInputObjectZodSchema = makeSchema();
