import * as z from 'zod';
export const ClinicFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  labId: z.string(),
  lab: z.unknown(),
  name: z.string(),
  description: z.string().optional(),
  website: z.string().optional(),
  notes: z.string().optional(),
  status: z.unknown(),
  type: z.unknown(),
  city: z.string(),
  zipcode: z.string().optional(),
  address1: z.string(),
  address2: z.string().optional(),
  email: z.string(),
  phoneNumber: z.string(),
  billingEmail: z.string().optional(),
  billingPhoneNumber: z.string().optional(),
  taxNumber: z.string().optional(),
  discount: z.number().optional(),
  creditLimit: z.number().optional(),
  currentBalance: z.number(),
  cases: z.array(z.unknown()),
  dentists: z.array(z.unknown()),
  casePricingPlans: z.array(z.unknown()),
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