import * as z from 'zod';

export const CaseScalarFieldEnumSchema = z.enum(['id', 'patientId', 'caseNumber', 'labId', 'caseCategoryId', 'status', 'grandTotal', 'manualDiscountAmount', 'manualDiscountReason', 'isWarranty', 'clinicId', 'dentistId', 'notes', 'deadline', 'createdAt', 'updatedAt', 'isRemake', 'originalCaseId', 'failureReason', 'failureFault', 'completedAt', 'deliveredAt'])

export type CaseScalarFieldEnum = z.infer<typeof CaseScalarFieldEnumSchema>;