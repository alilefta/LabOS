import * as z from 'zod';
import { AuthUserRoleSchema } from '../../enums/AuthUserRole.schema';
// prettier-ignore
export const AuthUserInputSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    emailVerified: z.boolean(),
    image: z.string().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    role: AuthUserRoleSchema,
    sessions: z.array(z.unknown()),
    accounts: z.array(z.unknown()),
    members: z.array(z.unknown()),
    invitations: z.array(z.unknown()),
    labUser: z.unknown().optional().nullable(),
    superUser: z.unknown().optional().nullable(),
    labId: z.string().optional().nullable(),
    banned: z.boolean().optional().nullable(),
    banReason: z.string().optional().nullable(),
    banExpires: z.date().optional().nullable()
}).strict();

export type AuthUserInputType = z.infer<typeof AuthUserInputSchema>;
