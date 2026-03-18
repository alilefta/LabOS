import * as z from 'zod';

export const SelectedToothScalarFieldEnumSchema = z.enum(['id', 'toothPosition', 'caseWorkItemId', 'labId', 'createdAt', 'updatedAt'])

export type SelectedToothScalarFieldEnum = z.infer<typeof SelectedToothScalarFieldEnumSchema>;