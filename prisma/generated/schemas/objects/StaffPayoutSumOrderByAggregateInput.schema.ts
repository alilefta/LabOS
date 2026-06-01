import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  amount: SortOrderSchema.optional()
}).strict();
export const StaffPayoutSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.StaffPayoutSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffPayoutSumOrderByAggregateInput>;
export const StaffPayoutSumOrderByAggregateInputObjectZodSchema = makeSchema();
