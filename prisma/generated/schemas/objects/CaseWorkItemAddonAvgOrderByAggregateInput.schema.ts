import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  priceSnapshot: SortOrderSchema.optional()
}).strict();
export const CaseWorkItemAddonAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.CaseWorkItemAddonAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemAddonAvgOrderByAggregateInput>;
export const CaseWorkItemAddonAvgOrderByAggregateInputObjectZodSchema = makeSchema();
