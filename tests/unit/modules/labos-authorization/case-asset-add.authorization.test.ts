import { describe, expect, it, vi } from 'vitest'

import { createLabOSAuthorizationService } from '@/modules/labos-authorization/service'
import { createOperationalPolicies } from '@/modules/labos-authorization/policies/operational.policies'
import { roleBundleHasPermission } from '@/modules/labos-authorization/roles'

const actor = (memberRoles: readonly string[]) => ({
	userId: 'user-a', memberId: 'member-a',
	organizationId: 'organization-a', memberRoles,
})

const validFacts = {
	caseId: 'case-a', labId: 'lab-a', organizationId: 'organization-a',
	relationshipsConsistent: true, hasActiveMemberAssignment: true,
}

function harness(options: {
	organizationId?: string | null
	facts?: typeof validFacts | null
} = {}) {
	const resolveOrganizationId = vi.fn().mockResolvedValue(
		options.organizationId === undefined ? 'organization-a' : options.organizationId,
	)
	const load = vi.fn().mockResolvedValue(options.facts === undefined ? validFacts : options.facts)
	const policies = createOperationalPolicies({
		caseReadFacts: { load },
		dentistReadFacts: { load: vi.fn() },
	})
	const service = createLabOSAuthorizationService({
		targetResolvers: { case: { resolveOrganizationId } },
		policies,
		monitor: { record: vi.fn() },
	})
	const can = (roles: readonly string[], permission = 'case.asset.add') => service.can({
		actor: actor(roles), boundaryId: 'N-FILE-110-AUTHZ',
		permission: permission as 'case.asset.add',
		target: { type: 'case', id: 'case-a' }, correlationId: 'correlation-a',
	})
	return { can, load, resolveOrganizationId, policies }
}

describe('case.asset.add Authorization V1', () => {
	it.each(['owner', 'admin', 'manager'] as const)(
		'allows %s for an authoritative saved Case without assignment', async (role) => {
			const { can } = harness({ facts: { ...validFacts, hasActiveMemberAssignment: false } })
			expect(roleBundleHasPermission(role, 'case.asset.add')).toBe(true)
			await expect(can([role])).resolves.toMatchObject({ allowed: true })
		},
	)

	it('allows assigned Staff on the exact saved Case, including DRAFT', async () => {
		const { can, load } = harness()
		expect(roleBundleHasPermission('staff', 'case.asset.add')).toBe(true)
		await expect(can(['staff'])).resolves.toMatchObject({ allowed: true })
		expect(load).toHaveBeenCalledWith(expect.objectContaining({
			target: { type: 'case', id: 'case-a' },
		}))
		// Case lifecycle status is deliberately not an input to this policy.
	})

	it.each([
		['unassigned', { ...validFacts, hasActiveMemberAssignment: false }],
		['foreign Lab', { ...validFacts, relationshipsConsistent: false }],
		['foreign Organization facts', { ...validFacts, organizationId: 'organization-b' }],
		['wrong Case facts', { ...validFacts, caseId: 'case-b' }],
		['missing facts', null],
	] as const)('denies Staff with %s', async (_label, facts) => {
		const { can } = harness({ facts })
		await expect(can(['staff'])).resolves.toMatchObject({ allowed: false })
	})

	it.each([null, 'organization-b'])(
		'denies a missing/foreign Case boundary without policy fact loading: %s',
		async (organizationId) => {
			const { can, load } = harness({ organizationId })
			await expect(can(['owner'])).resolves.toMatchObject({ allowed: false })
			expect(load).not.toHaveBeenCalled()
		},
	)

	it('uses the kernel role normalizer and denies unsupported roles', async () => {
		const { can } = harness()
		await expect(can([' STAFF '])).resolves.toMatchObject({ allowed: true })
		await expect(can(['unsupported'])).resolves.toMatchObject({ allowed: false })
	})

	it('does not borrow case.update or authorize replacement/deletion', async () => {
		const { can, policies } = harness()
		await expect(can(['staff'], 'case.update')).resolves.toMatchObject({ allowed: false })
		await expect(policies['case.asset.add'].evaluate({
			actor: actor(['owner']), permission: 'case.update',
			target: { type: 'case', id: 'case-a' },
			facts: { getOrLoad: vi.fn() },
		} as never)).resolves.toMatchObject({ allowed: false })
		expect(Object.keys(policies)).not.toContain('case.asset.replace')
		expect(Object.keys(policies)).not.toContain('case.asset.delete')
	})
})
