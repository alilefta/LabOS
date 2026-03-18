import * as z from 'zod';

export const SalesRepresentativeScalarFieldEnumSchema = z.enum(['id', 'firstName', 'lastName', 'city', 'zipcode', 'address1', 'address2', 'labId', 'email', 'phoneNumber', 'avatarUrl', 'createdAt', 'updatedAt'])

export type SalesRepresentativeScalarFieldEnum = z.infer<typeof SalesRepresentativeScalarFieldEnumSchema>;