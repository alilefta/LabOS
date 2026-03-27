import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  age: SortOrderSchema.optional()
}).strict();
export const PatientSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.PatientSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.PatientSumOrderByAggregateInput>;
export const PatientSumOrderByAggregateInputObjectZodSchema = makeSchema();
