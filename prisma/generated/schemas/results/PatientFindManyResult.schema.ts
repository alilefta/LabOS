import * as z from 'zod';
export const PatientFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  city: z.string(),
  zipcode: z.string(),
  address1: z.string(),
  address2: z.string().optional(),
  email: z.string(),
  phoneNumber: z.string(),
  case: z.array(z.unknown()),
  labId: z.string(),
  Lab: z.unknown(),
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