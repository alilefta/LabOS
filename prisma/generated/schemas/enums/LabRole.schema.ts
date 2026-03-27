import * as z from 'zod';

export const LabRoleSchema = z.enum(['OWNER', 'MANAGER', 'ADMIN', 'STAFF'])

export type LabRole = z.infer<typeof LabRoleSchema>;