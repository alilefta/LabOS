import * as z from 'zod';
export const CaseCategoryCreateResultSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  imageUrl: z.string(),
  isActive: z.boolean(),
  workTypes: z.array(z.unknown()),
  cases: z.array(z.unknown()),
  labId: z.string(),
  Lab: z.unknown(),
  createdAt: z.date(),
  updatedAt: z.date()
});