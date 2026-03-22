import * as z from 'zod';

export const SuperUserRoleSchema = z.enum(['ADMIN', 'MANAGER', 'STAFF'])

export type SuperUserRole = z.infer<typeof SuperUserRoleSchema>;