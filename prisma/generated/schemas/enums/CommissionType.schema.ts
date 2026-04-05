import * as z from 'zod';

export const CommissionTypeSchema = z.enum(['PERCENTAGE', 'FIXED'])

export type CommissionType = z.infer<typeof CommissionTypeSchema>;