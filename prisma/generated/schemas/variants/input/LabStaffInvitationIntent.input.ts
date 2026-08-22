import * as z from 'zod';
// prettier-ignore
export const LabStaffInvitationIntentInputSchema = z.object({
    id: z.string(),
    invitationId: z.string(),
    invitation: z.unknown(),
    labId: z.string(),
    labStaffId: z.string(),
    labStaff: z.unknown(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type LabStaffInvitationIntentInputType = z.infer<typeof LabStaffInvitationIntentInputSchema>;
