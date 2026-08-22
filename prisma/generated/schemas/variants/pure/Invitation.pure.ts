import * as z from 'zod';
// prettier-ignore
export const InvitationModelSchema = z.object({
    id: z.string(),
    organizationId: z.string(),
    organization: z.unknown(),
    email: z.string(),
    role: z.string().nullable(),
    status: z.string(),
    expiresAt: z.date(),
    createdAt: z.date(),
    inviterId: z.string(),
    authuser: z.unknown(),
    labStaffIntent: z.unknown().nullable()
}).strict();

export type InvitationPureType = z.infer<typeof InvitationModelSchema>;
