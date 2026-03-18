import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const SelectedToothOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.SelectedToothOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.SelectedToothOrderByRelationAggregateInput>;
export const SelectedToothOrderByRelationAggregateInputObjectZodSchema = makeSchema();
