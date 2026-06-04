import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  priceSnapshot: SortOrderSchema.optional()
}).strict();
export const CaseWorkItemAddonSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.CaseWorkItemAddonSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemAddonSumOrderByAggregateInput>;
export const CaseWorkItemAddonSumOrderByAggregateInputObjectZodSchema = makeSchema();
