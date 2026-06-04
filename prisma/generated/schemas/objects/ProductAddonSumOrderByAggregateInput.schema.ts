import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  price: SortOrderSchema.optional()
}).strict();
export const ProductAddonSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ProductAddonSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductAddonSumOrderByAggregateInput>;
export const ProductAddonSumOrderByAggregateInputObjectZodSchema = makeSchema();
