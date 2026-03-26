import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  productId: z.literal(true).optional(),
  labId: z.literal(true).optional(),
  dentalCaseId: z.literal(true).optional(),
  casePricingPlanId: z.literal(true).optional(),
  totalPrice: z.literal(true).optional(),
  pricingStrategy: z.literal(true).optional(),
  firstToothPrice: z.literal(true).optional(),
  bulkPrice: z.literal(true).optional(),
  additionalToothPrice: z.literal(true).optional(),
  bulkPriceThreshold: z.literal(true).optional(),
  jawType: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const CaseWorkItemCountAggregateInputObjectSchema: z.ZodType<Prisma.CaseWorkItemCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemCountAggregateInputType>;
export const CaseWorkItemCountAggregateInputObjectZodSchema = makeSchema();
