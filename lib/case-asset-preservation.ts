import { ERRORS } from '@/lib/errors'

export function assertNoCaseAssetMutationRequested(
	assets: readonly unknown[] | null | undefined,
): void {
	if (assets?.length) throw ERRORS.OPERATION_NOT_ALLOWED
}

export function assertAssetBearingDraftPatientPreserved(
	currentPatientId: string,
	nextPatientId: string,
	hasAssets: boolean,
): void {
	if (hasAssets && currentPatientId !== nextPatientId) {
		throw ERRORS.OPERATION_NOT_ALLOWED
	}
}
