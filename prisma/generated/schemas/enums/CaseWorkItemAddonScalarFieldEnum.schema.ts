import * as z from 'zod';

export const CaseWorkItemAddonScalarFieldEnumSchema = z.enum(['id', 'caseWorkItemId', 'addonId', 'priceSnapshot', 'labId', 'createdAt'])

export type CaseWorkItemAddonScalarFieldEnum = z.infer<typeof CaseWorkItemAddonScalarFieldEnumSchema>;