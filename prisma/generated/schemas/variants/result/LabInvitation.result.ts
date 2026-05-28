import * as z from 'zod';
import { LabRoleSchema } from '../../enums/LabRole.schema';
// prettier-ignore
export const LabInvitationResultSchema = z.object({
    id: z.string(),
    token: z.string(),
    email: z.string(),
    labId: z.string(),
    lab: z.unknown(),
    labStaffId: z.string().nullable(),
    labStaff: z.unknown().nullable(),
    roleToGrant: LabRoleSchema,
    expiresAt: z.date(),
    createdAt: z.date()
}).strict();

export type LabInvitationResultType = z.infer<typeof LabInvitationResultSchema>;
