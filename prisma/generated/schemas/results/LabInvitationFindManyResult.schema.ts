import * as z from 'zod';
export const LabInvitationFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  token: z.string(),
  email: z.string(),
  labId: z.string(),
  lab: z.unknown(),
  labStaffId: z.string().optional(),
  labStaff: z.unknown().optional(),
  roleToGrant: z.unknown(),
  expiresAt: z.date(),
  createdAt: z.date()
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