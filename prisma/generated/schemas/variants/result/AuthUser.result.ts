import * as z from 'zod';
// prettier-ignore
export const AuthUserResultSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    emailVerified: z.boolean(),
    image: z.string().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    role: z.string(),
    sessions: z.array(z.unknown()),
    accounts: z.array(z.unknown()),
    labUser: z.unknown().nullable(),
    superUser: z.unknown().nullable()
}).strict();

export type AuthUserResultType = z.infer<typeof AuthUserResultSchema>;
