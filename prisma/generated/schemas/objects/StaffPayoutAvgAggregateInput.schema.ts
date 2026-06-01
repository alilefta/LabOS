import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  amount: z.literal(true).optional()
}).strict();
export const StaffPayoutAvgAggregateInputObjectSchema: z.ZodType<Prisma.StaffPayoutAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.StaffPayoutAvgAggregateInputType>;
export const StaffPayoutAvgAggregateInputObjectZodSchema = makeSchema();
