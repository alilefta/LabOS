import * as z from 'zod';

export const PatientScalarFieldEnumSchema = z.enum(['id', 'name', 'description', 'notes', 'age', 'gender', 'labId', 'createdAt', 'updatedAt'])

export type PatientScalarFieldEnum = z.infer<typeof PatientScalarFieldEnumSchema>;