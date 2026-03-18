import * as z from 'zod';
export const LabGroupByResultSchema = z.array(z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  _count: z.object({
    id: z.number(),
    labSubscriptionPlan: z.number(),
    users: z.number(),
    clinics: z.number(),
    cases: z.number(),
    technicians: z.number(),
    salesReps: z.number(),
    caseCategories: z.number(),
    workTypes: z.number(),
    products: z.number(),
    caseWorkItems: z.number(),
    selectedTeeth: z.number(),
    casePricingPlans: z.number(),
    caseAssetFiles: z.number(),
    patient: z.number(),
    createdAt: z.number(),
    updatedAt: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()
}));