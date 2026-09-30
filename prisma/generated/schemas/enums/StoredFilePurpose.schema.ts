import * as z from 'zod';

export const StoredFilePurposeSchema = z.enum(['CASE_CLINICAL_ASSET'])

export type StoredFilePurpose = z.infer<typeof StoredFilePurposeSchema>;