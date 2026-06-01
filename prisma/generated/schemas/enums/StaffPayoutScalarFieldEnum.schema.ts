import * as z from 'zod';

export const StaffPayoutScalarFieldEnumSchema = z.enum(['id', 'payoutNumber', 'labId', 'staffId', 'amount', 'method', 'status', 'reference', 'notes', 'paidAt', 'createdAt', 'updatedAt'])

export type StaffPayoutScalarFieldEnum = z.infer<typeof StaffPayoutScalarFieldEnumSchema>;