import * as z from 'zod';

export const PayoutStatusSchema = z.enum(['PENDING_APPROVAL', 'PROCESSING', 'SETTLED', 'VOIDED'])

export type PayoutStatus = z.infer<typeof PayoutStatusSchema>;