import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  toothPosition: SortOrderSchema.optional(),
  caseWorkItemId: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const SelectedToothMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.SelectedToothMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.SelectedToothMaxOrderByAggregateInput>;
export const SelectedToothMaxOrderByAggregateInputObjectZodSchema = makeSchema();
