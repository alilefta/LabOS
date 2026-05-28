import * as z from 'zod';
export const LabInvitationCreateResultSchema = z.object({
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
});