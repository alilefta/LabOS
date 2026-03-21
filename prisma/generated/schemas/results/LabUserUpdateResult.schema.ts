import * as z from 'zod';
export const LabUserUpdateResultSchema = z.nullable(z.object({
  id: z.string(),
  name: z.string(),
  city: z.string(),
  zipcode: z.string(),
  address1: z.string(),
  address2: z.string().optional(),
  avatarUrl: z.string(),
  secondaryEmail: z.string().optional(),
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
}));