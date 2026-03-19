import * as z from 'zod';
export const LabFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string().optional(),
  brandAvatarUrl: z.string().optional(),
  subtitle: z.string().optional(),
  labSubscriptionPlan: z.unknown().optional(),
  users: z.array(z.unknown()),
  clinics: z.array(z.unknown()),
  cases: z.array(z.unknown()),
  technicians: z.array(z.unknown()),
  salesReps: z.array(z.unknown()),
  caseCategories: z.array(z.unknown()),
  workTypes: z.array(z.unknown()),
  products: z.array(z.unknown()),
  caseWorkItems: z.array(z.unknown()),
  selectedTeeth: z.array(z.unknown()),
  casePricingPlans: z.array(z.unknown()),
  caseAssetFiles: z.array(z.unknown()),
  patients: z.array(z.unknown()),
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