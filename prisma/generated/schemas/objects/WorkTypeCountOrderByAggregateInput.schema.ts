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
export const WorkTypeCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.WorkTypeCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.WorkTypeCountOrderByAggregateInput>;
export const WorkTypeCountOrderByAggregateInputObjectZodSchema = makeSchema();
