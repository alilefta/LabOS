import {
	isTenantContextError,
	TENANT_CONTEXT_ERROR_CODES,
} from '@/platform/organizations'
import { daError, daSuccess, toDAError, type DAResult } from '@/lib/data-access-errors'
import { ERRORS } from '@/lib/errors'
import { LabOSNonActionBoundaryError } from '@/modules/labos-authorization/non-action-boundaries'
import {
	createN002PaystubLoader,
	N002PaystubAuthorizationError,
} from '@/modules/labos-payroll/paystub.loader'
import type { StaffPaystubDTO } from '@/modules/labos-payroll/paystub.dto'

import { prismaPaystubRepository } from './paystub.repository'

export type { StaffPaystubDTO } from '@/modules/labos-payroll/paystub.dto'

const loadPaystub = createN002PaystubLoader({ repository: prismaPaystubRepository })

export async function getStaffPaystubData(
	staffId: string,
	payoutId: string,
): Promise<DAResult<StaffPaystubDTO>> {
	try {
		const paystub = await loadPaystub({ staffId, payoutId })
		return paystub ? daSuccess(paystub) : daError(ERRORS.NOT_FOUND.toJSON())
	} catch (error) {
		if (error instanceof LabOSNonActionBoundaryError) {
			return daError(ERRORS.INVALID_INPUT.toJSON())
		}
		if (error instanceof N002PaystubAuthorizationError) {
			return daError(ERRORS.MISSING_PERMISSIONS.toJSON())
		}
		if (isTenantContextError(error)) {
			if (error.code === TENANT_CONTEXT_ERROR_CODES.UNAUTHENTICATED) {
				return daError(ERRORS.UNAUTHORIZED.toJSON())
			}
			if (error.code === TENANT_CONTEXT_ERROR_CODES.MEMBERSHIP_REQUIRED) {
				return daError(ERRORS.NOT_MEMBER.toJSON())
			}
			return daError(ERRORS.LAB_NOT_FOUND.toJSON())
		}
		return toDAError(error)
	}
}
