import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  discount: SortOrderSchema.optional(),
  creditLimit: SortOrderSchema.optional(),
  currentBalance: SortOrderSchema.optional()
}).strict();
export const ClinicSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ClinicSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ClinicSumOrderByAggregateInput>;
export const ClinicSumOrderByAggregateInputObjectZodSchema = makeSchema();
