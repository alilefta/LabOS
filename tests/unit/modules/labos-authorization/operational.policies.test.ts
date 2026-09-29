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

function policies(caseLoad = vi.fn(), dentistLoad = vi.fn()) {
	return createOperationalPolicies({
		caseReadFacts: { load: caseLoad },
		dentistReadFacts: { load: dentistLoad },
	})
}

function caseRequest(memberRoles: readonly string[] = ['staff']) {
	return {
		actor: { ...actor, memberRoles },
		permission: 'case.read',
		target: { type: 'case', id: 'case-a' },
		facts: createAuthorizationFactCache(),
	} as const
}

const activeCaseFacts = {
	caseId: 'case-a',
	labId: 'lab-a',
	organizationId: 'organization-a',
	relationshipsConsistent: true,
	hasActiveMemberAssignment: true,
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
		const policy = policies(vi.fn(), load)['dentist.read']

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
		const policy = policies(vi.fn(), load)['dentist.read']
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

	it('allows Staff only with an active same-Case, same-Lab Member assignment', async () => {
		const load = vi.fn().mockResolvedValue(activeCaseFacts)
		const policy = policies(load)['case.read']

		await expect(policy.evaluate(caseRequest())).resolves.toEqual({ allowed: true })
		load.mockResolvedValueOnce({
			...activeCaseFacts,
			hasActiveMemberAssignment: false,
		})
		await expect(policy.evaluate(caseRequest())).resolves.toEqual({
			allowed: false,
			reason: 'AUTHZ_POLICY_DENIED',
		})
	})

	it.each(['owner', 'admin', 'manager'] as const)(
		'allows %s without a Staff assignment while preserving trusted Case facts',
		async (role) => {
			const policy = policies(
				vi.fn().mockResolvedValue({
					...activeCaseFacts,
					hasActiveMemberAssignment: false,
				}),
			)['case.read']
			await expect(policy.evaluate(caseRequest([role]))).resolves.toEqual({
				allowed: true,
			})
		},
	)

	it('uses the fixed-role union for mixed roles and denies malformed Case facts', async () => {
		const load = vi.fn().mockResolvedValue(activeCaseFacts)
		const policy = policies(load)['case.read']

		await expect(
			policy.evaluate(caseRequest(['staff', 'manager'])),
		).resolves.toEqual({ allowed: true })
		load.mockResolvedValueOnce(null)
		await expect(policy.evaluate(caseRequest(['staff']))).resolves.toEqual({
			allowed: false,
			reason: 'AUTHZ_POLICY_FACT_MISSING',
		})
	})

	it('fails closed before facts for a malformed Case target', async () => {
		const load = vi.fn()
		const policy = policies(load)['case.read']

		await expect(
			policy.evaluate({
				...caseRequest(),
				target: { type: 'dentist', id: 'case-a' },
			} as unknown as Parameters<typeof policy.evaluate>[0]),
		).resolves.toEqual({
			allowed: false,
			reason: 'AUTHZ_POLICY_FACT_MISSING',
		})
		expect(load).not.toHaveBeenCalled()
	})
})
