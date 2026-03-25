import * as z from 'zod';

export const CaseStatusSchema = z.enum(['NEW', 'ASSIGNED', 'PROCESSING', 'COMPLETED', 'FAILED', 'DELIEVERD', 'DRAFT'])

export type CaseStatus = z.infer<typeof CaseStatusSchema>;