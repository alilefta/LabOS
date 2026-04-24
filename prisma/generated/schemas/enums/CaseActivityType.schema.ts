import * as z from 'zod';

export const CaseActivityTypeSchema = z.enum(['CASE_CREATED', 'STATUS_CHANGED', 'CASE_UPDATED', 'STAFF_ASSIGNED', 'STAFF_REMOVED', 'NOTE_ADDED', 'FILE_UPLOADED', 'FILE_DELETED', 'DEADLINE_CHANGED', 'AI_AUDIT_COMPLETED', 'CASE_PRICING_RECALCULATED'])

export type CaseActivityType = z.infer<typeof CaseActivityTypeSchema>;