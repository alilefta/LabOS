import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  maxMembers: z.literal(true).optional(),
  maxCasesMonth: z.literal(true).optional()
}).strict();
export const LabSubscriptionPlanAvgAggregateInputObjectSchema: z.ZodType<Prisma.LabSubscriptionPlanAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.LabSubscriptionPlanAvgAggregateInputType>;
export const LabSubscriptionPlanAvgAggregateInputObjectZodSchema = makeSchema();
