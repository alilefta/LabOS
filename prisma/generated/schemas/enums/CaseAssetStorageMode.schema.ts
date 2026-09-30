import * as z from 'zod';

export const CaseAssetStorageModeSchema = z.enum(['LEGACY_URL_UNVERIFIED', 'MANAGED_PRIVATE'])

export type CaseAssetStorageMode = z.infer<typeof CaseAssetStorageModeSchema>;