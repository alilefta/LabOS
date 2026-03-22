import * as z from 'zod';

export const AuthUserRoleSchema = z.enum(['SYSTEM_USER', 'LAB_USER'])

export type AuthUserRole = z.infer<typeof AuthUserRoleSchema>;