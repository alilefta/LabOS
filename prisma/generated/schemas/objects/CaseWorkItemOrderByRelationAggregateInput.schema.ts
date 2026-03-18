import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const CaseWorkItemOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.CaseWorkItemOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemOrderByRelationAggregateInput>;
export const CaseWorkItemOrderByRelationAggregateInputObjectZodSchema = makeSchema();
