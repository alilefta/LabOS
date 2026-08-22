import * as z from 'zod';
// prettier-ignore
export const LabStaffInvitationIntentResultSchema = z.object({
    id: z.string(),
    invitationId: z.string(),
    invitation: z.unknown(),
    labId: z.string(),
    labStaffId: z.string(),
    labStaff: z.unknown(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type LabStaffInvitationIntentResultType = z.infer<typeof LabStaffInvitationIntentResultSchema>;
