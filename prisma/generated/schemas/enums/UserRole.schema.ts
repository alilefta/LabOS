import * as z from 'zod';

export const UserRoleSchema = z.enum(['SUPER_ADMIN', 'SUPER_MOD', 'LAB_MANAGER', 'LAB_ADMIN', 'LAB_STAFF'])

export type UserRole = z.infer<typeof UserRoleSchema>;