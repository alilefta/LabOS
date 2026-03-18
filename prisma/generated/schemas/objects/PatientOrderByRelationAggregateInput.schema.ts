import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const PatientOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.PatientOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.PatientOrderByRelationAggregateInput>;
export const PatientOrderByRelationAggregateInputObjectZodSchema = makeSchema();
