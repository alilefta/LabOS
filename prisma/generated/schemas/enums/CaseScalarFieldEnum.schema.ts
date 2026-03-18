import * as z from 'zod';

export const CaseScalarFieldEnumSchema = z.enum(['id', 'patientId', 'labId', 'salesRepsId', 'status', 'grandTotal', 'clinicId', 'technicianId', 'deadline', 'createdAt', 'updatedAt'])

export type CaseScalarFieldEnum = z.infer<typeof CaseScalarFieldEnumSchema>;