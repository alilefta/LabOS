import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  amount: z.literal(true).optional()
}).strict();
export const StaffPayoutSumAggregateInputObjectSchema: z.ZodType<Prisma.StaffPayoutSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.StaffPayoutSumAggregateInputType>;
export const StaffPayoutSumAggregateInputObjectZodSchema = makeSchema();
