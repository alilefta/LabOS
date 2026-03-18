import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  totalPrice: z.literal(true).optional(),
  firstToothPrice: z.literal(true).optional(),
  bulkPrice: z.literal(true).optional(),
  additionalToothPrice: z.literal(true).optional(),
  bulkPriceThreshold: z.literal(true).optional()
}).strict();
export const CaseWorkItemAvgAggregateInputObjectSchema: z.ZodType<Prisma.CaseWorkItemAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemAvgAggregateInputType>;
export const CaseWorkItemAvgAggregateInputObjectZodSchema = makeSchema();
