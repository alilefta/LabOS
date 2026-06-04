import * as z from 'zod';
export const ProductAddonFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  productId: z.string(),
  product: z.unknown(),
  labId: z.string(),
  lab: z.unknown(),
  name: z.string(),
  price: z.number(),
  isArchived: z.boolean(),
  caseWorkItemAddons: z.array(z.unknown()),
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