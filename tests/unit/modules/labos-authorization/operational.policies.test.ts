import { describe, expect, it, vi } from 'vitest'

import { createOperationalPolicies } from '@/modules/labos-authorization/policies/operational.policies'
import { createAuthorizationFactCache } from '@/platform/authorization'

const actor = {
	userId: 'user-1',
	memberId: 'member-1',
	organizationId: 'organization-a',
	memberRoles: ['staff'],
} as const

function request(routeClinicId = 'clinic-a') {
	return {
		actor,
		permission: 'dentist.read',
		target: { type: 'dentist', id: 'dentist-a' },
		operation: { kind: 'dentist.detail.read', routeClinicId },
		facts: createAuthorizationFactCache(),
	} as const
}

describe('operational authorization policies', () => {
	it('allows only a consistent same-tenant Dentist and route Clinic relationship', async () => {
		const load = vi.fn().mockResolvedValue({
			dentistId: 'dentist-a',
			clinicId: 'clinic-a',
			labId: 'lab-a',
			organizationId: 'organization-a',
			relationshipsConsistent: true,
		})
		const policy = createOperationalPolicies({ dentistReadFacts: { load } })[
			'dentist.read'
		]

		await expect(policy.evaluate(request())).resolves.toEqual({ allowed: true })
		await expect(policy.evaluate(request('clinic-b'))).resolves.toEqual({
			allowed: false,
			reason: 'AUTHZ_POLICY_DENIED',
		})
		load.mockResolvedValueOnce({
			dentistId: 'dentist-a',
			clinicId: 'clinic-a',
			labId: 'lab-a',
			organizationId: 'organization-a',
			relationshipsConsistent: false,
		})
		await expect(policy.evaluate(request())).resolves.toMatchObject({
			allowed: false,
		})
	})

	it('fails closed before facts for malformed operation intent', async () => {
		const load = vi.fn()
		const policy = createOperationalPolicies({ dentistReadFacts: { load } })[
			'dentist.read'
		]
		await expect(
			policy.evaluate({
				...request(),
				operation: undefined,
			} as unknown as Parameters<typeof policy.evaluate>[0]),
		).resolves.toEqual({
			allowed: false,
			reason: 'AUTHZ_POLICY_FACT_MISSING',
		})
		expect(load).not.toHaveBeenCalled()
	})
})
