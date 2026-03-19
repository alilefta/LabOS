import * as z from 'zod';
export const WorkTypeFindFirstResultSchema = z.nullable(z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  imageUrl: z.string(),
  product: z.array(z.unknown()),
  labId: z.string(),
  lab: z.unknown(),
  caseCategoryId: z.string(),
  caseCategory: z.unknown(),
  createdAt: z.date(),
  updatedAt: z.date()
}));