import * as z from 'zod';
export const AuthUserUpdateResultSchema = z.nullable(z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  role: z.string(),
  sessions: z.array(z.unknown()),
  accounts: z.array(z.unknown()),
  labUser: z.unknown().optional(),
  superUser: z.unknown().optional()
}));