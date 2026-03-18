import * as z from 'zod';

export const ClinicScalarFieldEnumSchema = z.enum(['id', 'labId', 'name', 'description', 'city', 'zipcode', 'address1', 'address2', 'email', 'phoneNumber', 'createdAt', 'updatedAt'])

export type ClinicScalarFieldEnum = z.infer<typeof ClinicScalarFieldEnumSchema>;