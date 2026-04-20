import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const CaseActivityLogOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.CaseActivityLogOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseActivityLogOrderByRelationAggregateInput>;
export const CaseActivityLogOrderByRelationAggregateInputObjectZodSchema = makeSchema();
