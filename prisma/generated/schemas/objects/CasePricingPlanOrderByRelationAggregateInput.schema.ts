import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const CasePricingPlanOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.CasePricingPlanOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CasePricingPlanOrderByRelationAggregateInput>;
export const CasePricingPlanOrderByRelationAggregateInputObjectZodSchema = makeSchema();
