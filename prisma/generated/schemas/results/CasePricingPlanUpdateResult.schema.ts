import * as z from 'zod';
export const CasePricingPlanUpdateResultSchema = z.nullable(z.object({
  id: z.string(),
  labId: z.string(),
  Lab: z.unknown(),
  pricingStrategy: z.unknown(),
  firstToothPrice: z.number().optional(),
  bulkPrice: z.number().optional(),
  additionalToothPrice: z.number().optional(),
  bulkPriceThreshold: z.number().optional(),
  caseWorkItem: z.array(z.unknown()),
  createdAt: z.date(),
  updatedAt: z.date()
}));