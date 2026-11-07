import 'server-only'

import { requireTenantContext } from '@/platform/organizations'
import type { ObjectStorage } from './object-storage/contract'
import { DefinitiveCaseS001Rejection, validateReservedObjectStorageClinicalJpegS001 } from './jpeg-s001/validate'
import { finalizeValidatedClinicalJpegS001 } from './jpeg-s001/finalize'
import { rejectDefinitiveCaseS001 } from './jpeg-s001/reject-case'
import { S001Unavailable } from './jpeg-s001/identity'
import { resolveReservedClinicalGrant } from './jpeg-r001/grant'
import { validateReservedObjectStorageCaseImageV1 } from './case-image-v1/object-storage'
import { finalizeValidatedCaseImageV1 } from './case-image-v1/finalize'

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
	let grant
	try { grant = await resolveReservedClinicalGrant(uploadGrantId, undefined,
		{ provider: 'OBJECT_STORAGE', tenant, allowCaseImageV1: true }) }
	catch { throw new S001Unavailable() }
	if (expectedCaseId !== undefined && grant.caseId !== expectedCaseId) throw new S001Unavailable()
	if (grant.checkedSuffix === 'PNG' || grant.checkedSuffix === 'WEBP') {
		const validated = await validateReservedObjectStorageCaseImageV1(grant, storage, signal)
		await finalizeValidatedCaseImageV1(validated)
		return Object.freeze({ uploadGrantId })
	}
	let validated
	try {
		validated = await validateReservedObjectStorageClinicalJpegS001(
			uploadGrantId, tenant, storage, signal, expectedCaseId,
		)
	} catch (error) {
		if (error instanceof DefinitiveCaseS001Rejection && !signal?.aborted) {
			await rejectDefinitiveCaseS001(error.grant)
		}
		throw new S001Unavailable()
	}
	await finalizeValidatedClinicalJpegS001(validated)
	return Object.freeze({ uploadGrantId })
}
