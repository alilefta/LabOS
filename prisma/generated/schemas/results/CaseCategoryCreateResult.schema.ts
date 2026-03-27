import * as z from 'zod';
export const CaseCategoryCreateResultSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  isActive: z.boolean(),
  workTypes: z.array(z.unknown()),
  cases: z.array(z.unknown()),
  labId: z.string(),
  lab: z.unknown(),
  createdAt: z.date(),
  updatedAt: z.date()
});