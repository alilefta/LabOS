import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  maxMembers: SortOrderSchema.optional(),
  maxCasesMonth: SortOrderSchema.optional()
}).strict();
export const LabSubscriptionPlanSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.LabSubscriptionPlanSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.LabSubscriptionPlanSumOrderByAggregateInput>;
export const LabSubscriptionPlanSumOrderByAggregateInputObjectZodSchema = makeSchema();
