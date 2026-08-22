import * as z from 'zod';
// prettier-ignore
export const LabStaffInvitationIntentModelSchema = z.object({
    id: z.string(),
    invitationId: z.string(),
    invitation: z.unknown(),
    labId: z.string(),
    labStaffId: z.string(),
    labStaff: z.unknown(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type LabStaffInvitationIntentPureType = z.infer<typeof LabStaffInvitationIntentModelSchema>;
