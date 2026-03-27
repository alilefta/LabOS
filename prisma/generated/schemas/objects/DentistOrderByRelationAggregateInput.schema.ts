import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const DentistOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.DentistOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.DentistOrderByRelationAggregateInput>;
export const DentistOrderByRelationAggregateInputObjectZodSchema = makeSchema();
