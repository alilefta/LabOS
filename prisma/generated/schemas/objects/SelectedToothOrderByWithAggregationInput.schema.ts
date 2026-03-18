import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SelectedToothCountOrderByAggregateInputObjectSchema as SelectedToothCountOrderByAggregateInputObjectSchema } from './SelectedToothCountOrderByAggregateInput.schema';
import { SelectedToothMaxOrderByAggregateInputObjectSchema as SelectedToothMaxOrderByAggregateInputObjectSchema } from './SelectedToothMaxOrderByAggregateInput.schema';
import { SelectedToothMinOrderByAggregateInputObjectSchema as SelectedToothMinOrderByAggregateInputObjectSchema } from './SelectedToothMinOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  toothPosition: SortOrderSchema.optional(),
  caseWorkItemId: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => SelectedToothCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => SelectedToothMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => SelectedToothMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const SelectedToothOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.SelectedToothOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.SelectedToothOrderByWithAggregationInput>;
export const SelectedToothOrderByWithAggregationInputObjectZodSchema = makeSchema();
