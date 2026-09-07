import { describe, expect, it, vi } from 'vitest'

import { createLabOSAuthorizationService } from '@/modules/labos-authorization/service'
import { projectN002PaystubBoundary } from '@/modules/labos-authorization/non-action-boundaries'
import {
	authorizeN002Paystub,
	createN002PaystubLoader,
	N002PaystubAuthorizationError,
} from '@/modules/labos-payroll/paystub.loader'

const routeInput = {
	staffId: '11111111-1111-4111-8111-111111111111',
	payoutId: '22222222-2222-4222-8222-222222222222',
} as const

function actor(role: string, memberId = 'member-ahmed') {
	return {
		userId: 'user-1',
		memberId,
		organizationId: 'organization-a',
		memberRoles: [role],
	}
}

function service(targetOrganizationId = 'organization-a') {
	return createLabOSAuthorizationService({
		targetResolvers: {
			payout: {
				resolveOrganizationId: vi.fn().mockResolvedValue(targetOrganizationId),
			},
		},
		policies: {
			'payout.read.relationships': {
				evaluate: vi.fn().mockResolvedValue({ allowed: true }),
			},
			'payout.self.ownership': {
				evaluate: vi.fn((context) => ({
					allowed:
						context.actor.memberId === 'member-ahmed' &&
						context.target?.id === routeInput.payoutId,
				})),
			},
		},
		monitor: { record: vi.fn() },
	})
}

describe('N-002 paystub authorization and loader', () => {
	it.each([
		['owner', 'payout.read'],
		['admin', 'payout.read'],
		['manager', 'payout.read'],
		['staff', 'payout.self.read'],
	] as const)('selects the approved permission for %s', async (role, permission) => {
		await expect(
			authorizeN002Paystub({
				actor: actor(role),
				projection: projectN002PaystubBoundary(routeInput),
				authorizationService: service(),
				generateCorrelationId: () => 'correlation-n-002',
			}),
		).resolves.toEqual({ permission, correlationId: 'correlation-n-002' })
	})

	it.each([
		['staff', 'member-ali', service()],
		['staff', 'member-ahmed', service('organization-b')],
		['unknown-role', 'member-ahmed', service()],
		['staff', '', service()],
	] as const)('fails closed for cross-Staff, cross-tenant, unknown, or missing identity (%s/%s)', async (role, memberId, authorizationService) => {
		await expect(
			authorizeN002Paystub({
				actor: actor(role, memberId),
				projection: projectN002PaystubBoundary(routeInput),
				authorizationService,
			}),
		).rejects.toThrow('You are not authorized')
	})

	it('never invokes the repository when authorization denies', async () => {
		const repository = { findPaystub: vi.fn() }
		const loader = createN002PaystubLoader({
			resolveTenant: vi.fn().mockResolvedValue({
				userId: 'user-1',
				memberId: 'member-1',
				memberRole: 'staff',
				organizationId: 'organization-a',
				labId: 'lab-a',
			}),
			authorize: vi.fn().mockRejectedValue(new Error('denied detail')),
			repository,
		})

		await expect(loader(routeInput)).rejects.toBeInstanceOf(
			N002PaystubAuthorizationError,
		)
		expect(repository.findPaystub).not.toHaveBeenCalled()
	})

	it('rejects malformed route identifiers before tenant or repository work', async () => {
		const resolveTenant = vi.fn()
		const repository = { findPaystub: vi.fn() }
		const loader = createN002PaystubLoader({ resolveTenant, repository })

		await expect(
			loader({ staffId: 'not-an-id', payoutId: routeInput.payoutId }),
		).rejects.toThrow('Authorization boundary input is invalid')
		expect(resolveTenant).not.toHaveBeenCalled()
		expect(repository.findPaystub).not.toHaveBeenCalled()
	})

	it('emits only sanitized server-owned decision labels for N-002', async () => {
		const record = vi.fn()
		const authorizationService = createLabOSAuthorizationService({
			targetResolvers: {
				payout: {
					resolveOrganizationId: vi.fn().mockResolvedValue('organization-a'),
				},
			},
			policies: {
				'payout.read.relationships': {
					evaluate: vi.fn().mockResolvedValue({ allowed: true }),
				},
				'payout.self.ownership': {
					evaluate: vi.fn().mockResolvedValue({ allowed: true }),
				},
			},
			monitor: { record },
		})

		await authorizeN002Paystub({
			actor: actor('staff'),
			projection: projectN002PaystubBoundary(routeInput),
			authorizationService,
			generateCorrelationId: () => 'correlation-n-002',
		})

		expect(record).toHaveBeenCalledWith(
			expect.objectContaining({
				boundaryId: 'N-002',
				permission: 'payout.self.read',
				targetType: 'payout',
				correlationId: 'correlation-n-002',
				outcome: 'allowed',
			}),
		)
		const serialized = JSON.stringify(record.mock.calls)
		expect(serialized).not.toContain(routeInput.staffId)
		expect(serialized).not.toContain(routeInput.payoutId)
		expect(serialized).not.toContain('member-ahmed')
		expect(serialized).not.toContain('user-1')
	})

	it('forwards only canonical Lab identity and validated route identifiers after allow', async () => {
		const repository = { findPaystub: vi.fn().mockResolvedValue(null) }
		const loader = createN002PaystubLoader({
			resolveTenant: vi.fn().mockResolvedValue({
				userId: 'user-1',
				memberId: 'member-1',
				memberRole: 'manager',
				organizationId: 'organization-a',
				labId: 'lab-a',
			}),
			authorize: vi.fn().mockResolvedValue({
				permission: 'payout.read',
				correlationId: 'correlation-n-002',
			}),
			repository,
		})

		await loader(routeInput)
		expect(repository.findPaystub).toHaveBeenCalledWith({
			labId: 'lab-a',
			staffId: routeInput.staffId,
			payoutId: routeInput.payoutId,
		})
	})
})
