import * as z from 'zod';
export const ProductUpdateResultSchema = z.nullable(z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  caseWorkItems: z.array(z.unknown()),
  labId: z.string(),
  lab: z.unknown(),
  workTypeId: z.string(),
  workType: z.unknown(),
  createdAt: z.date(),
  updatedAt: z.date(),
  casePricingPlans: z.array(z.unknown())
}));