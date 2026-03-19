import * as z from 'zod';

export const AuthUserScalarFieldEnumSchema = z.enum(['id', 'name', 'email', 'emailVerified', 'image', 'createdAt', 'updatedAt', 'role'])

export type AuthUserScalarFieldEnum = z.infer<typeof AuthUserScalarFieldEnumSchema>;