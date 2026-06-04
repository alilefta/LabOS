import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const ProductAddonOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.ProductAddonOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductAddonOrderByRelationAggregateInput>;
export const ProductAddonOrderByRelationAggregateInputObjectZodSchema = makeSchema();
