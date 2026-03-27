import * as z from 'zod';

export const ClinicScalarFieldEnumSchema = z.enum(['id', 'labId', 'name', 'description', 'website', 'notes', 'status', 'type', 'city', 'zipcode', 'address1', 'address2', 'email', 'phoneNumber', 'billingEmail', 'billingPhoneNumber', 'taxNumber', 'discount', 'creditLimit', 'currentBalance', 'createdAt', 'updatedAt'])

export type ClinicScalarFieldEnum = z.infer<typeof ClinicScalarFieldEnumSchema>;