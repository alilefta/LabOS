import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const CaseOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.CaseOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseOrderByRelationAggregateInput>;
export const CaseOrderByRelationAggregateInputObjectZodSchema = makeSchema();
