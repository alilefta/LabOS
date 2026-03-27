import * as z from 'zod';
export const PatientFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  notes: z.string().optional(),
  age: z.number().int().optional(),
  gender: z.unknown().optional(),
  cases: z.array(z.unknown()),
  labId: z.string(),
  lab: z.unknown(),
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