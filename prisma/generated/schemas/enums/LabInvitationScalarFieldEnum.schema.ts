import * as z from 'zod';

export const LabInvitationScalarFieldEnumSchema = z.enum(['id', 'token', 'email', 'labId', 'labStaffId', 'roleToGrant', 'expiresAt', 'createdAt'])

export type LabInvitationScalarFieldEnum = z.infer<typeof LabInvitationScalarFieldEnumSchema>;