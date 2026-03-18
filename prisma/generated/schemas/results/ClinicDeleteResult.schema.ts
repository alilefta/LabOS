import * as z from 'zod';
export const ClinicDeleteResultSchema = z.nullable(z.object({
  id: z.string(),
  labId: z.string(),
  Lab: z.unknown(),
  name: z.string(),
  description: z.string().optional(),
  city: z.string(),
  zipcode: z.string(),
  address1: z.string(),
  address2: z.string().optional(),
  email: z.string(),
  phoneNumber: z.string(),
  cases: z.array(z.unknown()),
  createdAt: z.date(),
  updatedAt: z.date()
}));