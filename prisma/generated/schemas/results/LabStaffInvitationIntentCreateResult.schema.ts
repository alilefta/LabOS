import * as z from 'zod';
export const LabStaffInvitationIntentCreateResultSchema = z.object({
  id: z.string(),
  invitationId: z.string(),
  invitation: z.unknown(),
  labId: z.string(),
  labStaffId: z.string(),
  labStaff: z.unknown(),
  createdAt: z.date(),
  updatedAt: z.date()
});