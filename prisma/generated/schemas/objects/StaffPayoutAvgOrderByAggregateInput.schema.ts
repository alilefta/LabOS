import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  amount: SortOrderSchema.optional()
}).strict();
export const StaffPayoutAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.StaffPayoutAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffPayoutAvgOrderByAggregateInput>;
export const StaffPayoutAvgOrderByAggregateInputObjectZodSchema = makeSchema();
