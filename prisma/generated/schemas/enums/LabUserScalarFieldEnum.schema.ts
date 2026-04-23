import * as z from 'zod';

export const LabUserScalarFieldEnumSchema = z.enum(['id', 'labId', 'authUserId', 'labStaffId', 'role', 'isActive', 'lastTimeActive', 'createdAt', 'updatedAt'])

export type LabUserScalarFieldEnum = z.infer<typeof LabUserScalarFieldEnumSchema>;