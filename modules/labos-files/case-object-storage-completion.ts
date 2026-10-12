import 'server-only'

import { requireTenantContext } from '@/platform/organizations'
import type { ObjectStorage } from './object-storage/contract'
import { validateReservedObjectStorageClinicalJpegS001 } from './jpeg-s001/validate'
import { finalizeValidatedClinicalJpegS001 } from './jpeg-s001/finalize'

/**
 * Inactive N-FILE-110 Case completion command. The client supplies only the
 * grant ID; authoritative key, tenant, suffix and evidence are server-owned.
 * S001 finalization commits evidence and PENDING -> UPLOADED in one transaction.
 */
export async function completeCaseObjectStorageUpload(
	uploadGrantId: string,
	storage: ObjectStorage,
	signal?: AbortSignal,
	expectedCaseId?: string,
): Promise<Readonly<{ uploadGrantId: string }>> {
	const tenant = await requireTenantContext()
	const validated = await validateReservedObjectStorageClinicalJpegS001(
		uploadGrantId, tenant, storage, signal, expectedCaseId,
	)
	await finalizeValidatedClinicalJpegS001(validated)
	return Object.freeze({ uploadGrantId })
}
