import * as z from 'zod';

export const WorkTypeScalarFieldEnumSchema = z.enum(['id', 'name', 'description', 'imageUrl', 'labId', 'requireTeethSelection', 'caseCategoryId', 'createdAt', 'updatedAt'])

export type WorkTypeScalarFieldEnum = z.infer<typeof WorkTypeScalarFieldEnumSchema>;