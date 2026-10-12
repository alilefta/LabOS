import 'server-only'

import type { ObjectStorage } from './contract'
import { createR2ObjectStorage } from './r2'

/** Infrastructure-only binding. No R2 configuration enters Files commands. */
export function createConfiguredObjectStorage(): ObjectStorage {
	return createR2ObjectStorage({
		accountId: process.env.LABOS_R2_ACCOUNT_ID ?? '',
		bucket: process.env.LABOS_R2_BUCKET ?? '',
		accessKeyId: process.env.LABOS_R2_ACCESS_KEY_ID ?? '',
		secretAccessKey: process.env.LABOS_R2_SECRET_ACCESS_KEY ?? '',
	})
}
