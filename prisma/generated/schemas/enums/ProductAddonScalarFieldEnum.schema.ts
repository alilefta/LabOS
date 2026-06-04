import * as z from 'zod';

export const ProductAddonScalarFieldEnumSchema = z.enum(['id', 'productId', 'labId', 'name', 'price', 'isArchived', 'createdAt', 'updatedAt'])

export type ProductAddonScalarFieldEnum = z.infer<typeof ProductAddonScalarFieldEnumSchema>;