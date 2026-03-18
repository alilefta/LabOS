import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  description: SortOrderSchema.optional(),
  imageUrl: SortOrderSchema.optional(),
  isActive: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const CaseCategoryMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.CaseCategoryMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseCategoryMaxOrderByAggregateInput>;
export const CaseCategoryMaxOrderByAggregateInputObjectZodSchema = makeSchema();
