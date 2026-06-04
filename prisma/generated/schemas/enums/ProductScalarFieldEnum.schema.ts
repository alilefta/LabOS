import * as z from 'zod';

export const ProductScalarFieldEnumSchema = z.enum(['id', 'name', 'description', 'imageUrl', 'labId', 'workTypeId', 'createdAt', 'updatedAt', 'isArchived'])

export type ProductScalarFieldEnum = z.infer<typeof ProductScalarFieldEnumSchema>;