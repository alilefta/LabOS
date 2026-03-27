import * as z from 'zod';

export const CaseScalarFieldEnumSchema = z.enum(['id', 'patientId', 'caseNumber', 'labId', 'salesRepsId', 'caseCategoryId', 'status', 'grandTotal', 'clinicId', 'dentistId', 'technicianId', 'deadline', 'createdAt', 'updatedAt'])

export type CaseScalarFieldEnum = z.infer<typeof CaseScalarFieldEnumSchema>;