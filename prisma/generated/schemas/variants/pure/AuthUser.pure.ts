import * as z from 'zod';
import { AuthUserRoleSchema } from '../../enums/AuthUserRole.schema';
// prettier-ignore
export const AuthUserModelSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    emailVerified: z.boolean(),
    image: z.string().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    role: AuthUserRoleSchema,
    sessions: z.array(z.unknown()),
    accounts: z.array(z.unknown()),
    labUser: z.unknown().nullable(),
    superUser: z.unknown().nullable(),
    labId: z.string().nullable()
}).strict();

export type AuthUserPureType = z.infer<typeof AuthUserModelSchema>;
