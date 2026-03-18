import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  totalPrice: z.literal(true).optional(),
  firstToothPrice: z.literal(true).optional(),
  bulkPrice: z.literal(true).optional(),
  additionalToothPrice: z.literal(true).optional(),
  bulkPriceThreshold: z.literal(true).optional()
}).strict();
export const CaseWorkItemSumAggregateInputObjectSchema: z.ZodType<Prisma.CaseWorkItemSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemSumAggregateInputType>;
export const CaseWorkItemSumAggregateInputObjectZodSchema = makeSchema();
