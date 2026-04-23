import * as z from 'zod';
export const LabGroupByResultSchema = z.array(z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  brandAvatarUrl: z.string(),
  subtitle: z.string(),
  nextCaseNumber: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  _count: z.object({
    id: z.number(),
    title: z.number(),
    slug: z.number(),
    brandAvatarUrl: z.number(),
    subtitle: z.number(),
    labSubscriptionPlan: z.number(),
    clinics: z.number(),
    cases: z.number(),
    caseCategories: z.number(),
    workTypes: z.number(),
    products: z.number(),
    caseWorkItems: z.number(),
    selectedTeeth: z.number(),
    casePricingPlans: z.number(),
    caseAssetFiles: z.number(),
    patients: z.number(),
    dentists: z.number(),
    staffAssignments: z.number(),
    users: z.number(),
    staff: z.number(),
    nextCaseNumber: z.number(),
    caseActivityLogs: z.number(),
    createdAt: z.number(),
    updatedAt: z.number()
  }).optional(),
  _sum: z.object({
    nextCaseNumber: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    nextCaseNumber: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable(),
    title: z.string().nullable(),
    slug: z.string().nullable(),
    brandAvatarUrl: z.string().nullable(),
    subtitle: z.string().nullable(),
    nextCaseNumber: z.number().int().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    title: z.string().nullable(),
    slug: z.string().nullable(),
    brandAvatarUrl: z.string().nullable(),
    subtitle: z.string().nullable(),
    nextCaseNumber: z.number().int().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()
}));