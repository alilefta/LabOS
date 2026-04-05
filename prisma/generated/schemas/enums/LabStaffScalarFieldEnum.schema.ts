import * as z from 'zod';

export const LabStaffScalarFieldEnumSchema = z.enum(['id', 'firstName', 'lastName', 'labId', 'email', 'phoneNumber', 'avatarUrl', 'isActive', 'roleCategory', 'jobTitle', 'specialization', 'commissionType', 'commissionValue', 'createdAt', 'updatedAt'])

export type LabStaffScalarFieldEnum = z.infer<typeof LabStaffScalarFieldEnumSchema>;