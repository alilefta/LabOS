import * as z from 'zod';
export const SalesRepresentativeFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  city: z.string(),
  zipcode: z.string(),
  address1: z.string(),
  address2: z.string().optional(),
  labId: z.string(),
  Lab: z.unknown(),
  email: z.string(),
  phoneNumber: z.string(),
  avatarUrl: z.string(),
  cases: z.array(z.unknown()),
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