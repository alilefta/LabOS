import * as z from 'zod';
export const PatientFindFirstResultSchema = z.nullable(z.object({
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
}));