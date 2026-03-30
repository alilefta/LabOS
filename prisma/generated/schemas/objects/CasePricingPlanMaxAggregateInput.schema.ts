import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  labId: z.literal(true).optional(),
  name: z.literal(true).optional(),
  isDefault: z.literal(true).optional(),
  pricingStrategy: z.literal(true).optional(),
  firstToothPrice: z.literal(true).optional(),
  additionalToothPrice: z.literal(true).optional(),
  TeethCountToApplyBulkPrice: z.literal(true).optional(),
  bulkPrice: z.literal(true).optional(),
  toothPrice: z.literal(true).optional(),
  productId: z.literal(true).optional(),
  clinicId: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const CasePricingPlanMaxAggregateInputObjectSchema: z.ZodType<Prisma.CasePricingPlanMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.CasePricingPlanMaxAggregateInputType>;
export const CasePricingPlanMaxAggregateInputObjectZodSchema = makeSchema();
