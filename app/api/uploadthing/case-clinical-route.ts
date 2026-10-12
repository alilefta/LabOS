import { createUploadthing } from 'uploadthing/next'
import { UploadThingError } from 'uploadthing/server'

import { CaseAssetStageInputSchema, stageCaseAsset } from '@/modules/labos-files/case-asset-stage.contract'
import { handoffVerifiedCaseClinicalCallback } from '@/modules/labos-files/case-clinical-callback'
import { parseCaseClinicalCheckedSuffix } from '@/modules/labos-files/case-clinical-suffix'

const f = createUploadthing()
const MAX_JPEG_BYTES = 33_554_432

/**
 * Complete Case-only provider boundary. Deliberately absent from the exported
 * FileRouter until a separately authorized N-FILE-110 runtime activation.
 */
export const caseClinicalJpegRoute = f({
	'image/jpeg': { maxFileSize: '32MB', maxFileCount: 1 },
}, {
	presignedURLTTL: '15m',
	// UploadThing 7.7.4 hashes these parts into its opaque key. Domain IDs and
	// the client filename must never supply the key seed.
	getFileHashParts: () => [crypto.randomUUID()],
})
	.input(CaseAssetStageInputSchema)
	.middleware(async ({ input, files }) => {
		const file = files[0]
		const checkedSuffix = parseCaseClinicalCheckedSuffix(file?.name)
		if (files.length !== 1 || !file || file.size <= 0 ||
			file.size > MAX_JPEG_BYTES || file.type !== 'image/jpeg' ||
			!checkedSuffix) {
			throw new UploadThingError('Case clinical JPEG upload unavailable')
		}
		// The existing serializable writer rechecks DRAFT, canonical tenant,
		// Member role, and active Staff assignment before creating a grant.
		return stageCaseAsset(input, checkedSuffix)
	})
	.onUploadComplete(async ({ metadata, file }) => {
		// UploadThing verifies the callback and carries server middleware metadata.
		// Name, size, type, URL, and provider hash are not clinical evidence.
		return handoffVerifiedCaseClinicalCallback({
			metadata,
			file: { key: file.key },
		})
	})
