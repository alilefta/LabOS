import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  description: SortOrderSchema.optional(),
  imageUrl: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional(),
  requireTeethSelection: SortOrderSchema.optional(),
  caseCategoryId: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const WorkTypeMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.WorkTypeMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.WorkTypeMinOrderByAggregateInput>;
export const WorkTypeMinOrderByAggregateInputObjectZodSchema = makeSchema();
