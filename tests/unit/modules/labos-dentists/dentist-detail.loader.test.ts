import { describe, expect, it, vi } from 'vitest'

import { createLabOSAuthorizationService } from '@/modules/labos-authorization/service'
import {
	authorizeNApi002DentistDetail,
	createNApi002DentistDetailLoader,
	NApi002DentistAuthorizationError,
} from '@/modules/labos-dentists/dentist-detail.loader'
import { projectNApi002DentistDetailBoundary } from '@/modules/labos-authorization/non-action-boundaries'
import {
	TENANT_CONTEXT_ERROR_CODES,
	TenantContextError,
} from '@/platform/organizations'

const routeInput = {
	dentistId: '11111111-1111-4111-8111-111111111111',
	clinicId: '22222222-2222-4222-8222-222222222222',
} as const

function actor(role: string, organizationId = 'organization-a') {
	return {
		userId: 'user-1',
		memberId: 'member-1',
		organizationId,
		memberRoles: [role],
	}
}

function service(targetOrganizationId = 'organization-a', policyAllows = true) {
	return createLabOSAuthorizationService({
		targetResolvers: {
			dentist: {
				resolveOrganizationId: vi.fn().mockResolvedValue(targetOrganizationId),
			},
		},
		policies: {
			'dentist.read': {
				evaluate: vi.fn().mockResolvedValue({ allowed: policyAllows }),
			},
		},
		monitor: { record: vi.fn() },
	})
}

describe('N-API-002 Dentist detail authorization and loader', () => {
	it.each(['owner', 'admin', 'manager', 'staff'])(
		'allows the approved dentist.read role bundle for %s',
		async (role) => {
			await expect(
				authorizeNApi002DentistDetail({
					actor: actor(role),
					projection: projectNApi002DentistDetailBoundary(routeInput),
					authorizationService: service(),
					generateCorrelationId: () => 'correlation-n-api-002',
				}),
			).resolves.toEqual({ correlationId: 'correlation-n-api-002' })
		},
	)

	it.each([
		['unknown-role', 'organization-a', 'organization-a'],
		['staff', 'organization-a', 'organization-b'],
		['staff', '', 'organization-a'],
	] as const)(
		'fails closed for unknown role, cross-tenant target, or missing identity',
		async (role, organizationId, targetOrganizationId) => {
			await expect(
				authorizeNApi002DentistDetail({
					actor: actor(role, organizationId),
					projection: projectNApi002DentistDetailBoundary(routeInput),
					authorizationService: service(targetOrganizationId),
				}),
			).rejects.toBeInstanceOf(NApi002DentistAuthorizationError)
		},
	)

	it('does not invoke the tenant repository after policy denial', async () => {
		const repository = { findDentistDetail: vi.fn() }
		const loader = createNApi002DentistDetailLoader({
			resolveTenant: vi.fn().mockResolvedValue({
				userId: 'user-1',
				memberId: 'member-1',
				memberRole: 'staff',
				staffId: 'staff-1',
				organizationId: 'organization-a',
				labId: 'lab-a',
				lab: { id: 'lab-a', title: 'Lab A', slug: 'lab-a' },
			}),
			authorize: vi.fn().mockRejectedValue(new Error('denied')),
			repository,
		})

		await expect(loader(routeInput)).rejects.toBeInstanceOf(
			NApi002DentistAuthorizationError,
		)
		expect(repository.findDentistDetail).not.toHaveBeenCalled()
	})

	it('fails before authorization and repository work when membership is missing', async () => {
		const authorize = vi.fn()
		const repository = { findDentistDetail: vi.fn() }
		const loader = createNApi002DentistDetailLoader({
			resolveTenant: vi.fn().mockRejectedValue(
				new TenantContextError(
					TENANT_CONTEXT_ERROR_CODES.MEMBERSHIP_REQUIRED,
					'Membership required',
				),
			),
			authorize,
			repository,
		})

		await expect(loader(routeInput)).rejects.toMatchObject({
			code: TENANT_CONTEXT_ERROR_CODES.MEMBERSHIP_REQUIRED,
		})
		expect(authorize).not.toHaveBeenCalled()
		expect(repository.findDentistDetail).not.toHaveBeenCalled()
	})

	it('rejects malformed identifiers before tenant and repository work', async () => {
		const resolveTenant = vi.fn()
		const repository = { findDentistDetail: vi.fn() }
		const loader = createNApi002DentistDetailLoader({ resolveTenant, repository })

		await expect(
			loader({ ...routeInput, clinicId: 'caller-controlled-garbage' }),
		).rejects.toThrow('Authorization boundary input is invalid')
		expect(resolveTenant).not.toHaveBeenCalled()
		expect(repository.findDentistDetail).not.toHaveBeenCalled()
	})

	it('forwards only the canonical Lab and validated identifiers after allow', async () => {
		const repository = { findDentistDetail: vi.fn().mockResolvedValue(null) }
		const loader = createNApi002DentistDetailLoader({
			resolveTenant: vi.fn().mockResolvedValue({
				userId: 'user-1',
				memberId: 'member-1',
				memberRole: 'manager',
				staffId: null,
				organizationId: 'organization-a',
				labId: 'lab-a',
				lab: { id: 'lab-a', title: 'Lab A', slug: null },
			}),
			authorize: vi.fn().mockResolvedValue({
				correlationId: 'correlation-n-api-002',
			}),
			repository,
		})

		await loader(routeInput)
		expect(repository.findDentistDetail).toHaveBeenCalledWith({
			labId: 'lab-a',
			clinicId: routeInput.clinicId,
			dentistId: routeInput.dentistId,
		})
	})

	it('emits sanitized N-API-002 decision telemetry without route identifiers', async () => {
		const record = vi.fn()
		const authorizationService = createLabOSAuthorizationService({
			targetResolvers: {
				dentist: {
					resolveOrganizationId: vi.fn().mockResolvedValue('organization-a'),
				},
			},
			policies: {
				'dentist.read': {
					evaluate: vi.fn().mockResolvedValue({ allowed: true }),
				},
			},
			monitor: { record },
		})

		await authorizeNApi002DentistDetail({
			actor: actor('staff'),
			projection: projectNApi002DentistDetailBoundary(routeInput),
			authorizationService,
			generateCorrelationId: () => 'correlation-n-api-002',
		})

		expect(record).toHaveBeenCalledWith(
			expect.objectContaining({
				boundaryId: 'N-API-002',
				permission: 'dentist.read',
				targetType: 'dentist',
				correlationId: 'correlation-n-api-002',
				outcome: 'allowed',
			}),
		)
		const serialized = JSON.stringify(record.mock.calls)
		expect(serialized).not.toContain(routeInput.dentistId)
		expect(serialized).not.toContain(routeInput.clinicId)
		expect(serialized).not.toContain('member-1')
		expect(serialized).not.toContain('user-1')
	})
})
