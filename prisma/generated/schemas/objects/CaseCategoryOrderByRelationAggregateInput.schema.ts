import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const CaseCategoryOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.CaseCategoryOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseCategoryOrderByRelationAggregateInput>;
export const CaseCategoryOrderByRelationAggregateInputObjectZodSchema = makeSchema();
