import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const WorkTypeOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.WorkTypeOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.WorkTypeOrderByRelationAggregateInput>;
export const WorkTypeOrderByRelationAggregateInputObjectZodSchema = makeSchema();
