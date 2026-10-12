import * as z from 'zod';

export const StoredFileProviderSchema = z.enum(['UPLOADTHING', 'OBJECT_STORAGE'])

export type StoredFileProvider = z.infer<typeof StoredFileProviderSchema>;