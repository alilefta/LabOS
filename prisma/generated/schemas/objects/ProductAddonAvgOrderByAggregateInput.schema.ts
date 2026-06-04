import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  price: SortOrderSchema.optional()
}).strict();
export const ProductAddonAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ProductAddonAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductAddonAvgOrderByAggregateInput>;
export const ProductAddonAvgOrderByAggregateInputObjectZodSchema = makeSchema();
