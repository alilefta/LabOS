import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  priceSnapshot: z.literal(true).optional()
}).strict();
export const CaseWorkItemAddonAvgAggregateInputObjectSchema: z.ZodType<Prisma.CaseWorkItemAddonAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemAddonAvgAggregateInputType>;
export const CaseWorkItemAddonAvgAggregateInputObjectZodSchema = makeSchema();
