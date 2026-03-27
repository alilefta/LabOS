import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  maxMembers: SortOrderSchema.optional(),
  maxCasesMonth: SortOrderSchema.optional()
}).strict();
export const LabSubscriptionPlanAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.LabSubscriptionPlanAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.LabSubscriptionPlanAvgOrderByAggregateInput>;
export const LabSubscriptionPlanAvgOrderByAggregateInputObjectZodSchema = makeSchema();
