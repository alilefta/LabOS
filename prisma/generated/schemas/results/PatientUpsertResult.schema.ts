import * as z from 'zod';
export const PatientUpsertResultSchema = z.object({
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
});