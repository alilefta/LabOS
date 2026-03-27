import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  discount: SortOrderSchema.optional(),
  creditLimit: SortOrderSchema.optional(),
  currentBalance: SortOrderSchema.optional()
}).strict();
export const ClinicAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ClinicAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ClinicAvgOrderByAggregateInput>;
export const ClinicAvgOrderByAggregateInputObjectZodSchema = makeSchema();
