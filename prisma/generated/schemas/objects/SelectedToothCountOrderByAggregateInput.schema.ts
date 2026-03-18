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
export const SelectedToothCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.SelectedToothCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.SelectedToothCountOrderByAggregateInput>;
export const SelectedToothCountOrderByAggregateInputObjectZodSchema = makeSchema();
