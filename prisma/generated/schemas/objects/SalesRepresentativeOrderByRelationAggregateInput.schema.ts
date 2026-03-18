import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const SalesRepresentativeOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.SalesRepresentativeOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.SalesRepresentativeOrderByRelationAggregateInput>;
export const SalesRepresentativeOrderByRelationAggregateInputObjectZodSchema = makeSchema();
