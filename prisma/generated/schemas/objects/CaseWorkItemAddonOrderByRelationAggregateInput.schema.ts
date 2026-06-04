import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const CaseWorkItemAddonOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.CaseWorkItemAddonOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemAddonOrderByRelationAggregateInput>;
export const CaseWorkItemAddonOrderByRelationAggregateInputObjectZodSchema = makeSchema();
