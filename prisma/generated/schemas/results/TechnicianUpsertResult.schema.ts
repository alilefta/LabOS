import * as z from 'zod';
export const TechnicianUpsertResultSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  city: z.string(),
  zipcode: z.string(),
  address1: z.string(),
  address2: z.string().optional(),
  labId: z.string(),
  lab: z.unknown(),
  email: z.string(),
  phoneNumber: z.string(),
  avatarUrl: z.string(),
  cases: z.array(z.unknown()),
  createdAt: z.date(),
  updatedAt: z.date()
});