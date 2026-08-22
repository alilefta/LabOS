import * as z from 'zod';
// prettier-ignore
export const MemberInputSchema = z.object({
    id: z.string(),
    organizationId: z.string(),
    organization: z.unknown(),
    userId: z.string(),
    authuser: z.unknown(),
    role: z.string(),
    createdAt: z.date(),
    labStaff: z.unknown().optional().nullable()
}).strict();

export type MemberInputType = z.infer<typeof MemberInputSchema>;
