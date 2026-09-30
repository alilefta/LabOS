import * as z from 'zod';

export const StoredFileProviderSchema = z.enum(['UPLOADTHING'])

export type StoredFileProvider = z.infer<typeof StoredFileProviderSchema>;