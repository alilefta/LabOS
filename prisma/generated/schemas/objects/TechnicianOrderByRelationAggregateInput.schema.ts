import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const TechnicianOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.TechnicianOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.TechnicianOrderByRelationAggregateInput>;
export const TechnicianOrderByRelationAggregateInputObjectZodSchema = makeSchema();
