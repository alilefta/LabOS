import * as z from 'zod';

export const SuperUserScalarFieldEnumSchema = z.enum(['id', 'name', 'city', 'zipcode', 'address1', 'address2', 'avatarUrl', 'email', 'phoneNumber', 'role', 'authUserId', 'isActive', 'lastTimeActive', 'createdAt', 'updatedAt'])

export type SuperUserScalarFieldEnum = z.infer<typeof SuperUserScalarFieldEnumSchema>;