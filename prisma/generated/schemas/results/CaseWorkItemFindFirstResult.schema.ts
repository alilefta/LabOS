import * as z from 'zod';
export const CaseWorkItemFindFirstResultSchema = z.nullable(z.object({
  id: z.string(),
  productId: z.string().optional(),
  product: z.unknown().optional(),
  labId: z.string(),
  Lab: z.unknown(),
  caseId: z.string(),
  case: z.unknown(),
  casePricingPlanId: z.string(),
  casePricingPlan: z.unknown(),
  totalPrice: z.number(),
  pricingStrategy: z.unknown(),
  firstToothPrice: z.number().optional(),
  bulkPrice: z.number().optional(),
  additionalToothPrice: z.number().optional(),
  bulkPriceThreshold: z.number().optional(),
  jawType: z.unknown(),
  selectedTeeth: z.array(z.unknown()),
  createdAt: z.date(),
  updatedAt: z.date()
}));