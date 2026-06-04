import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  caseWorkItemId: SortOrderSchema.optional(),
  addonId: SortOrderSchema.optional(),
  priceSnapshot: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional()
}).strict();
export const CaseWorkItemAddonMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.CaseWorkItemAddonMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemAddonMinOrderByAggregateInput>;
export const CaseWorkItemAddonMinOrderByAggregateInputObjectZodSchema = makeSchema();
