import * as z from 'zod';

export const LabScalarFieldEnumSchema = z.enum(['id', 'title', 'slug', 'brandAvatarUrl', 'subtitle', 'nextCaseNumber', 'nextPayoutNumber', 'nextInvoiceNumber', 'createdAt', 'updatedAt'])

export type LabScalarFieldEnum = z.infer<typeof LabScalarFieldEnumSchema>;