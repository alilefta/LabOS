import * as z from 'zod';

export const StoredFileProviderAccessSchema = z.enum(['PUBLIC_READ', 'PRIVATE'])

export type StoredFileProviderAccess = z.infer<typeof StoredFileProviderAccessSchema>;