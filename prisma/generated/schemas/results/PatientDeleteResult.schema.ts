import * as z from 'zod';
export const PatientDeleteResultSchema = z.nullable(z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  city: z.string(),
  zipcode: z.string().optional(),
  address1: z.string(),
  address2: z.string().optional(),
  email: z.string().optional(),
  phoneNumber: z.string().optional(),
  cases: z.array(z.unknown()),
  labId: z.string(),
  lab: z.unknown(),
  createdAt: z.date(),
  updatedAt: z.date()
}));