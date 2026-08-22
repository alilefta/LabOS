import * as z from 'zod';
// prettier-ignore
export const OrganizationInputSchema = z.object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
    logo: z.string().optional().nullable(),
    createdAt: z.date(),
    metadata: z.string().optional().nullable(),
    members: z.array(z.unknown()),
    invitations: z.array(z.unknown()),
    lab: z.unknown().optional().nullable()
}).strict();

export type OrganizationInputType = z.infer<typeof OrganizationInputSchema>;
