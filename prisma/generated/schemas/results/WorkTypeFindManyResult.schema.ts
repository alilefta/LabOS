import * as z from 'zod';
export const WorkTypeFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  products: z.array(z.unknown()),
  labId: z.string(),
  lab: z.unknown(),
  requireTeethSelection: z.boolean(),
  caseWorkItems: z.array(z.unknown()),
  caseCategoryId: z.string(),
  caseCategory: z.unknown(),
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