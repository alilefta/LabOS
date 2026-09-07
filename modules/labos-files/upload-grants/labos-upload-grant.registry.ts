import { createUploadGrantRegistry } from './upload-grant.registry'
import { createUploadGrantService } from './upload-grant.service'

const PROTECTED_UPLOAD_GRANT_TTL_MS = 15 * 60_000

/**
 * Approved protected upload-grant definitions that are ready for boundary
 * adapter wiring. Registration does not activate an UploadThing endpoint or
 * authorize staging by itself.
 *
 * Staff self-avatar and Case asset definitions remain intentionally absent.
 */
export const labOSUploadGrantRegistry = createUploadGrantRegistry([
	{
		boundaryId: 'N-FILE-102',
		purpose: 'catalog.category.image.create.stage',
		targetType: null,
		ttlMs: PROTECTED_UPLOAD_GRANT_TTL_MS,
	},
	{
		boundaryId: 'N-FILE-103',
		purpose: 'catalog.category.image.update.stage',
		targetType: 'catalog.category',
		ttlMs: PROTECTED_UPLOAD_GRANT_TTL_MS,
	},
	{
		boundaryId: 'N-FILE-104',
		purpose: 'catalog.worktype.image.create.stage',
		targetType: null,
		ttlMs: PROTECTED_UPLOAD_GRANT_TTL_MS,
	},
	{
		boundaryId: 'N-FILE-105',
		purpose: 'catalog.worktype.image.update.stage',
		targetType: 'catalog.worktype',
		ttlMs: PROTECTED_UPLOAD_GRANT_TTL_MS,
	},
	{
		boundaryId: 'N-FILE-106',
		purpose: 'catalog.product.image.create.stage',
		targetType: null,
		ttlMs: PROTECTED_UPLOAD_GRANT_TTL_MS,
	},
	{
		boundaryId: 'N-FILE-107',
		purpose: 'catalog.product.image.update.stage',
		targetType: 'catalog.product',
		ttlMs: PROTECTED_UPLOAD_GRANT_TTL_MS,
	},
	{
		boundaryId: 'N-FILE-108',
		purpose: 'dentist.avatar.create.stage',
		targetType: null,
		ttlMs: PROTECTED_UPLOAD_GRANT_TTL_MS,
	},
	{
		boundaryId: 'N-FILE-109',
		purpose: 'dentist.avatar.update.stage',
		targetType: 'dentist',
		ttlMs: PROTECTED_UPLOAD_GRANT_TTL_MS,
	},
] as const)

/** Server-only lifecycle service; protected routes are not wired yet. */
export const labOSUploadGrantService = createUploadGrantService({
	registry: labOSUploadGrantRegistry,
})
