import * as z from 'zod';
import { LabRoleSchema } from '../../enums/LabRole.schema';
// prettier-ignore
export const LabInvitationInputSchema = z.object({
    id: z.string(),
    token: z.string(),
    email: z.string(),
    labId: z.string(),
    lab: z.unknown(),
    labStaffId: z.string().optional().nullable(),
    labStaff: z.unknown().optional().nullable(),
    roleToGrant: LabRoleSchema,
    expiresAt: z.date(),
    createdAt: z.date()
}).strict();

export type LabInvitationInputType = z.infer<typeof LabInvitationInputSchema>;
