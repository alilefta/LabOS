import * as z from 'zod';
export const LabStaffFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  labId: z.string(),
  lab: z.unknown(),
  firstName: z.string(),
  lastName: z.string(),
  phoneNumber: z.string(),
  avatarUrl: z.string().optional(),
  isActive: z.boolean(),
  city: z.string(),
  address1: z.string(),
  address2: z.string().optional(),
  zipcode: z.string().optional(),
  roleCategory: z.unknown(),
  jobTitle: z.string().optional(),
  specialization: z.string().optional(),
  commissionType: z.unknown(),
  commissionValue: z.number().optional(),
  labUser: z.unknown().optional(),
  caseAssignments: z.array(z.unknown()),
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