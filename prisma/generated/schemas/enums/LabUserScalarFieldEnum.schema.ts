import * as z from 'zod';

export const LabUserScalarFieldEnumSchema = z.enum(['id', 'name', 'city', 'zipcode', 'address1', 'address2', 'avatarUrl', 'secondaryEmail', 'phoneNumber', 'role', 'authUserId', 'labId', 'isActive', 'lastTimeActive', 'createdAt', 'updatedAt'])

export type LabUserScalarFieldEnum = z.infer<typeof LabUserScalarFieldEnumSchema>;