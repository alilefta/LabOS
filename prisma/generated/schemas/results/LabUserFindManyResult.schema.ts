import * as z from 'zod';
export const LabUserFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  name: z.string(),
  city: z.string(),
  zipcode: z.string(),
  address1: z.string(),
  address2: z.string().optional(),
  avatarUrl: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
  role: z.unknown(),
  authUserId: z.string(),
  authUser: z.unknown(),
  labId: z.string(),
  lab: z.unknown(),
  isActive: z.boolean(),
  lastTimeActive: z.date().optional(),
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