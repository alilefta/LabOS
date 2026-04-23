import * as z from 'zod';

export const LabStaffScalarFieldEnumSchema = z.enum(['id', 'labId', 'firstName', 'lastName', 'phoneNumber', 'avatarUrl', 'isActive', 'city', 'address1', 'address2', 'zipcode', 'roleCategory', 'jobTitle', 'specialization', 'commissionType', 'commissionValue', 'createdAt', 'updatedAt'])

export type LabStaffScalarFieldEnum = z.infer<typeof LabStaffScalarFieldEnumSchema>;