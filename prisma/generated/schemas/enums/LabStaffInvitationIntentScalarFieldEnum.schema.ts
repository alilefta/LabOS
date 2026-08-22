import * as z from 'zod';

export const LabStaffInvitationIntentScalarFieldEnumSchema = z.enum(['id', 'invitationId', 'labId', 'labStaffId', 'createdAt', 'updatedAt'])

export type LabStaffInvitationIntentScalarFieldEnum = z.infer<typeof LabStaffInvitationIntentScalarFieldEnumSchema>;