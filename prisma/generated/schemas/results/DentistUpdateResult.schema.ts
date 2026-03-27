import * as z from 'zod';
export const DentistUpdateResultSchema = z.nullable(z.object({
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
}));