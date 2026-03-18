import * as z from 'zod';

export const CaseCategoryScalarFieldEnumSchema = z.enum(['id', 'name', 'description', 'imageUrl', 'isActive', 'labId', 'createdAt', 'updatedAt'])

export type CaseCategoryScalarFieldEnum = z.infer<typeof CaseCategoryScalarFieldEnumSchema>;