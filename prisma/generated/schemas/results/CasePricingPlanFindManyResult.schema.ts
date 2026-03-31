import * as z from 'zod';
export const CasePricingPlanFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  labId: z.string(),
  lab: z.unknown(),
  name: z.string(),
  isDefault: z.boolean(),
  pricingStrategy: z.unknown(),
  firstToothPrice: z.number().optional(),
  additionalToothPrice: z.number().optional(),
  teethCountToApplyBulkPrice: z.number().optional(),
  bulkPrice: z.number().optional(),
  toothPrice: z.number().optional(),
  productId: z.string().optional(),
  product: z.unknown().optional(),
  clinicId: z.string().optional(),
  clinic: z.unknown().optional(),
  caseWorkItem: z.array(z.unknown()),
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