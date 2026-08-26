import { describe, expect, it, vi } from 'vitest'

import { createOrganizationMemberDetailLoader } from '@/modules/labos-membership'
import type { TenantContext } from '@/platform/organizations'

const memberId = '1690baa7-467a-4143-97dc-1e557022f788'
const tenant: TenantContext = {
	userId: 'user-a',
	memberId: 'member-a',
	memberRole: 'owner',
	staffId: null,
	organizationId: 'organization-a',
	labId: 'lab-a',
	lab: { id: 'lab-a', title: 'Lab A', slug: 'lab-a' },
}

describe('M-001 Organization Member detail loader', () => {
	it('validates, resolves tenancy, authorizes, then performs the scoped read', async () => {
		const resolveTenant = vi.fn().mockResolvedValue(tenant)
		const authorize = vi.fn().mockResolvedValue({})
		const repository = { findById: vi.fn().mockResolvedValue(null) }
		const load = createOrganizationMemberDetailLoader({
			resolveTenant,
			authorize,
			repository,
		})

		await expect(load({ memberId })).resolves.toBeNull()
		expect(authorize).toHaveBeenCalledWith({
			boundaryId: 'M-001',
			parsedInput: { memberId },
			tenant,
		})
		expect(repository.findById).toHaveBeenCalledWith({
			tenant: { organizationId: 'organization-a', labId: 'lab-a' },
			memberId,
		})
		expect(resolveTenant.mock.invocationCallOrder[0]).toBeLessThan(
			authorize.mock.invocationCallOrder[0],
		)
		expect(authorize.mock.invocationCallOrder[0]).toBeLessThan(
			repository.findById.mock.invocationCallOrder[0],
		)
	})

	it('never queries when V1 denies', async () => {
		const denial = new Error('denied')
		const repository = { findById: vi.fn() }
		const load = createOrganizationMemberDetailLoader({
			resolveTenant: vi.fn().mockResolvedValue(tenant),
			authorize: vi.fn().mockRejectedValue(denial),
			repository,
		})

		await expect(load({ memberId })).rejects.toBe(denial)
		expect(repository.findById).not.toHaveBeenCalled()
	})

	it('rejects unvalidated fields before tenant resolution', async () => {
		const resolveTenant = vi.fn()
		const load = createOrganizationMemberDetailLoader({
			resolveTenant,
			authorize: vi.fn(),
			repository: { findById: vi.fn() },
		})

		await expect(
			load({ memberId, organizationId: 'organization-b' }),
		).rejects.toBeDefined()
		expect(resolveTenant).not.toHaveBeenCalled()
	})

	it('uses independent tenant predicates after Organization switching', async () => {
		const repositoryA = { findById: vi.fn().mockResolvedValue(null) }
		const repositoryB = { findById: vi.fn().mockResolvedValue(null) }
		const authorize = vi.fn().mockResolvedValue({})
		const loadA = createOrganizationMemberDetailLoader({
			resolveTenant: vi.fn().mockResolvedValue(tenant),
			authorize,
			repository: repositoryA,
		})
		const loadB = createOrganizationMemberDetailLoader({
			resolveTenant: vi.fn().mockResolvedValue({
				...tenant,
				organizationId: 'organization-b',
				labId: 'lab-b',
				lab: { id: 'lab-b', title: 'Lab B', slug: 'lab-b' },
			}),
			authorize,
			repository: repositoryB,
		})

		await loadA({ memberId })
		await loadB({ memberId })

		expect(repositoryA.findById).toHaveBeenCalledWith(
			expect.objectContaining({
				tenant: { organizationId: 'organization-a', labId: 'lab-a' },
			}),
		)
		expect(repositoryB.findById).toHaveBeenCalledWith(
			expect.objectContaining({
				tenant: { organizationId: 'organization-b', labId: 'lab-b' },
			}),
		)
	})
})
