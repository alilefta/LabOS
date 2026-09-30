import * as z from 'zod';
// prettier-ignore
export const OrganizationResultSchema = z.object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
    logo: z.string().nullable(),
    createdAt: z.date(),
    metadata: z.string().nullable(),
    members: z.array(z.unknown()),
    invitations: z.array(z.unknown()),
    lab: z.unknown().nullable(),
    fileUploadGrants: z.array(z.unknown()),
    storedFiles: z.array(z.unknown()),
    clinicalUploadEvidence: z.array(z.unknown())
}).strict();

export type OrganizationResultType = z.infer<typeof OrganizationResultSchema>;
