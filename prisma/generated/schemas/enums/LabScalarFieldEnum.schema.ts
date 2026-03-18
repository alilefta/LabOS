import * as z from 'zod';

export const LabScalarFieldEnumSchema = z.enum(['id', 'createdAt', 'updatedAt'])

export type LabScalarFieldEnum = z.infer<typeof LabScalarFieldEnumSchema>;