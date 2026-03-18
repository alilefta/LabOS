import * as z from 'zod';

export const PatientScalarFieldEnumSchema = z.enum(['id', 'name', 'description', 'city', 'zipcode', 'address1', 'address2', 'email', 'phoneNumber', 'labId', 'createdAt', 'updatedAt'])

export type PatientScalarFieldEnum = z.infer<typeof PatientScalarFieldEnumSchema>;