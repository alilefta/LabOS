import 'server-only'

import type { ObjectStorage } from './contract'
import { createR2ObjectStorage } from './r2'
import { CASE_OBJECT_STORAGE_MODE } from '../case-object-storage-activation'
import { createLocalCaseObjectStorage } from './local-case'

/** Infrastructure-only binding. No R2 configuration enters Files commands. */
export function createConfiguredObjectStorage(): ObjectStorage {
	if (CASE_OBJECT_STORAGE_MODE === 'LOCAL') return createLocalCaseObjectStorage()
	if (CASE_OBJECT_STORAGE_MODE !== 'HOSTED_VERIFICATION') throw new Error('Case object storage unavailable')
	return createR2ObjectStorage({
		accountId: process.env.LABOS_R2_ACCOUNT_ID ?? '',
		bucket: process.env.LABOS_R2_BUCKET ?? '',
		accessKeyId: process.env.LABOS_R2_ACCESS_KEY_ID ?? '',
		secretAccessKey: process.env.LABOS_R2_SECRET_ACCESS_KEY ?? '',
	})
}
