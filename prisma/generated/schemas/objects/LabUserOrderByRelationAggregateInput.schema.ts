import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const LabUserOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.LabUserOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUserOrderByRelationAggregateInput>;
export const LabUserOrderByRelationAggregateInputObjectZodSchema = makeSchema();
