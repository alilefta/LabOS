import * as z from 'zod';

export const CaseStaffAssignmentScalarFieldEnumSchema = z.enum(['id', 'caseId', 'staffId', 'labId', 'roleCategory', 'commissionType', 'commissionValue', 'commissionTotal', 'isPaid', 'paidAt', 'payoutId', 'createdAt', 'updatedAt'])

export type CaseStaffAssignmentScalarFieldEnum = z.infer<typeof CaseStaffAssignmentScalarFieldEnumSchema>;