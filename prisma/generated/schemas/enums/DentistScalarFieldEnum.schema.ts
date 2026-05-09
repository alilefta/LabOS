import * as z from 'zod';

export const DentistScalarFieldEnumSchema = z.enum(['id', 'clinicId', 'labId', 'name', 'email', 'phoneNumber', 'isOwner', 'isDefault', 'notes', 'isActive', 'avatarUrl', 'specialty', 'licenseNumber', 'createdAt', 'updatedAt'])

export type DentistScalarFieldEnum = z.infer<typeof DentistScalarFieldEnumSchema>;