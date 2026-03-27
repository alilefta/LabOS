import * as z from 'zod';
export const DentistFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  clinicId: z.string(),
  clinic: z.unknown(),
  labId: z.string(),
  lab: z.unknown(),
  name: z.string(),
  email: z.string().optional(),
  phoneNumber: z.string().optional(),
  isOwner: z.boolean(),
  isDefault: z.boolean(),
  notes: z.string().optional(),
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