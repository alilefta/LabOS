import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  age: SortOrderSchema.optional()
}).strict();
export const PatientAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.PatientAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.PatientAvgOrderByAggregateInput>;
export const PatientAvgOrderByAggregateInputObjectZodSchema = makeSchema();
