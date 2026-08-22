import 'server-only'

import { daError, daSuccess, type DAResult } from '@/lib/data-access-errors'
import { ERRORS } from '@/lib/errors'
import {
	requireTenantContext,
	isTenantContextError,
	TENANT_CONTEXT_ERROR_CODES,
	type TenantContext,
} from '@/platform/organizations/tenant-context'

/**
 * Resolves the canonical tenant for data-access functions while translating
 * expected session/tenant failures into their existing serializable result
 * contract. Unexpected failures are deliberately rethrown for the caller's
 * normal diagnostics and safe error handling.
 */
export async function getDataTenantContext(
	resolveTenant: () => Promise<TenantContext> = requireTenantContext,
): Promise<DAResult<TenantContext>> {
	try {
		return daSuccess(await resolveTenant())
	} catch (error) {
		if (!isTenantContextError(error)) throw error

		if (error.code === TENANT_CONTEXT_ERROR_CODES.UNAUTHENTICATED) {
			return daError(ERRORS.UNAUTHORIZED.toJSON())
		}

		if (error.code === TENANT_CONTEXT_ERROR_CODES.MEMBERSHIP_REQUIRED) {
			return daError(ERRORS.NOT_MEMBER.toJSON())
		}

		return daError(ERRORS.LAB_NOT_FOUND.toJSON())
	}
}
