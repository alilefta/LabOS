import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  maxMembers: z.literal(true).optional(),
  maxCasesMonth: z.literal(true).optional()
}).strict();
export const LabSubscriptionPlanSumAggregateInputObjectSchema: z.ZodType<Prisma.LabSubscriptionPlanSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.LabSubscriptionPlanSumAggregateInputType>;
export const LabSubscriptionPlanSumAggregateInputObjectZodSchema = makeSchema();
