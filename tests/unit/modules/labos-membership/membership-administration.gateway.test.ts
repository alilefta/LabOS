import { beforeEach, describe, expect, it, vi } from 'vitest'

const auth = vi.hoisted(() => ({
	api: {
		updateMemberRole: vi.fn(),
		removeMember: vi.fn(),
	},
}))

vi.mock('@/lib/auth', () => ({ auth }))

import { betterAuthMembershipAdministrationGateway } from '@/modules/labos-membership/membership-administration.gateway'

const target = {
	organizationId: 'organization-a',
	memberId: 'member-b',
	requestHeaders: new Headers({ cookie: 'secret-session' }),
}

describe('Better Auth membership administration gateway', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('passes explicit Organization and fixed roles to Better Auth', async () => {
		auth.api.updateMemberRole.mockResolvedValue({
			id: 'member-b',
			organizationId: 'organization-a',
		})

		await betterAuthMembershipAdministrationGateway.updateRole({
			...target,
			roles: ['manager', 'staff'],
		})

		expect(auth.api.updateMemberRole).toHaveBeenCalledWith({
			body: {
				memberId: 'member-b',
				organizationId: 'organization-a',
				role: ['manager', 'staff'],
			},
			headers: target.requestHeaders,
		})
	})

	it('removes by Member ID and explicit Organization, never email', async () => {
		auth.api.removeMember.mockResolvedValue({
			member: { id: 'member-b', organizationId: 'organization-a' },
		})

		await betterAuthMembershipAdministrationGateway.remove(target)

		expect(auth.api.removeMember).toHaveBeenCalledWith({
			body: {
				memberIdOrEmail: 'member-b',
				organizationId: 'organization-a',
			},
			headers: target.requestHeaders,
		})
	})

	it.each([
		['update', { id: 'member-other', organizationId: 'organization-a' }],
		['update', { id: 'member-b', organizationId: 'organization-other' }],
		[
			'remove',
			{ member: { id: 'member-other', organizationId: 'organization-a' } },
		],
	])('rejects an unexpected authoritative provider target for %s', async (kind, result) => {
		if (kind === 'update') {
			auth.api.updateMemberRole.mockResolvedValue(result)
			await expect(
				betterAuthMembershipAdministrationGateway.updateRole({
					...target,
					roles: ['staff'],
				}),
			).rejects.toThrow('Membership provider returned an unexpected target')
			return
		}

		auth.api.removeMember.mockResolvedValue(result)
		await expect(
			betterAuthMembershipAdministrationGateway.remove(target),
		).rejects.toThrow('Membership provider returned an unexpected target')
	})
})
