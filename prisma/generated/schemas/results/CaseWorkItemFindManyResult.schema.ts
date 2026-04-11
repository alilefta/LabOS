import * as z from 'zod';
export const CaseWorkItemFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  productId: z.string().optional(),
  product: z.unknown().optional(),
  labId: z.string(),
  lab: z.unknown(),
  dentalCaseId: z.string(),
  dentalCase: z.unknown(),
  casePricingPlanId: z.string(),
  casePricingPlan: z.unknown(),
  totalPrice: z.number(),
  pricingStrategy: z.unknown(),
  firstToothPrice: z.number().optional(),
  additionalToothPrice: z.number().optional(),
  teethCountToApplyBulkPrice: z.number().optional(),
  bulkPrice: z.number().optional(),
  toothPrice: z.number().optional(),
  jawType: z.unknown(),
  workTypeId: z.string().optional(),
  workType: z.unknown().optional(),
  notes: z.string().optional(),
  shadeSystem: z.string().optional(),
  baseShade: z.string().optional(),
  stumpShade: z.string().optional(),
  shadeNotes: z.string().optional(),
  selectedTeeth: z.array(z.unknown()),
  createdAt: z.date(),
  updatedAt: z.date()
})),
  pagination: z.object({
  page: z.number().int().min(1),
  pageSize: z.number().int().min(1),
  total: z.number().int().min(0),
  totalPages: z.number().int().min(0),
  hasNext: z.boolean(),
  hasPrev: z.boolean()
})
});