import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  grandTotal: z.literal(true).optional()
}).strict();
export const CaseSumAggregateInputObjectSchema: z.ZodType<Prisma.CaseSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.CaseSumAggregateInputType>;
export const CaseSumAggregateInputObjectZodSchema = makeSchema();
