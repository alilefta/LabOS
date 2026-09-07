import { beforeEach, describe, expect, it, vi } from 'vitest'

const loadDentistDetail = vi.hoisted(() => vi.fn())

vi.mock('@/modules/labos-dentists/dentist-detail.loader', async (importOriginal) => {
	const actual = await importOriginal<
		typeof import('@/modules/labos-dentists/dentist-detail.loader')
	>()
	return {
		...actual,
		createNApi002DentistDetailLoader: () => loadDentistDetail,
	}
})

import { GET } from '@/app/api/dentists/[dentistId]/route'
import {
	LABOS_NON_ACTION_BOUNDARY_ERROR_CODES,
	LabOSNonActionBoundaryError,
} from '@/modules/labos-authorization/non-action-boundaries'
import { NApi002DentistAuthorizationError } from '@/modules/labos-dentists/dentist-detail.loader'
import {
	TENANT_CONTEXT_ERROR_CODES,
	TenantContextError,
} from '@/platform/organizations'

const dentistId = '11111111-1111-4111-8111-111111111111'
const clinicId = '22222222-2222-4222-8222-222222222222'

async function request() {
	return GET(new Request(`http://localhost/api/dentists/${dentistId}?clinicId=${clinicId}`), {
		params: Promise.resolve({ dentistId }),
	})
}

describe('N-API-002 Dentist detail route', () => {
	beforeEach(() => vi.clearAllMocks())

	it('returns only the authorized Dentist edit DTO', async () => {
		loadDentistDetail.mockResolvedValue({ id: dentistId, name: 'Dr Ahmed' })
		const response = await request()

		expect(response.status).toBe(200)
		expect(await response.json()).toEqual({
			dentist: { id: dentistId, name: 'Dr Ahmed' },
		})
		expect(loadDentistDetail).toHaveBeenCalledWith({ dentistId, clinicId })
	})

	it('maps invalid identifiers to a client-safe 400', async () => {
		loadDentistDetail.mockRejectedValue(
			new LabOSNonActionBoundaryError(
				LABOS_NON_ACTION_BOUNDARY_ERROR_CODES.VALIDATED_INPUT_INVALID,
			),
		)
		const response = await request()
		expect(response.status).toBe(400)
		expect(await response.json()).toEqual({ error: 'Invalid request' })
	})

	it('maps missing authentication to a client-safe 401', async () => {
		loadDentistDetail.mockRejectedValue(
			new TenantContextError(
				TENANT_CONTEXT_ERROR_CODES.UNAUTHENTICATED,
				'unauthenticated detail',
			),
		)
		const response = await request()
		expect(response.status).toBe(401)
		expect(await response.json()).toEqual({ error: 'Access denied' })
	})

	it('conceals authorization denials behind the not-found response', async () => {
		loadDentistDetail.mockRejectedValue(new NApi002DentistAuthorizationError())
		const response = await request()
		expect(response.status).toBe(404)
		expect(await response.json()).toEqual({ error: 'Dentist not found' })
	})
})
