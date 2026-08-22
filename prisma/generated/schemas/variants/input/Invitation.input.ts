import * as z from 'zod';
// prettier-ignore
export const InvitationInputSchema = z.object({
    id: z.string(),
    organizationId: z.string(),
    organization: z.unknown(),
    email: z.string(),
    role: z.string().optional().nullable(),
    status: z.string(),
    expiresAt: z.date(),
    createdAt: z.date(),
    inviterId: z.string(),
    authuser: z.unknown(),
    labStaffIntent: z.unknown().optional().nullable()
}).strict();

export type InvitationInputType = z.infer<typeof InvitationInputSchema>;
