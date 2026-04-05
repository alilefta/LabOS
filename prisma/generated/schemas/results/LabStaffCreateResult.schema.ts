import * as z from 'zod';
export const LabStaffCreateResultSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  labId: z.string(),
  lab: z.unknown(),
  email: z.string().optional(),
  phoneNumber: z.string(),
  avatarUrl: z.string().optional(),
  isActive: z.boolean(),
  roleCategory: z.unknown(),
  jobTitle: z.string().optional(),
  specialization: z.string().optional(),
  commissionType: z.unknown(),
  commissionValue: z.number().optional(),
  cases: z.array(z.unknown()),
  createdAt: z.date(),
  updatedAt: z.date()
});