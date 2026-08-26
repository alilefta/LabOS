import { describe, expect, it, vi } from 'vitest'

import { authorizeLabOSMembershipOperation } from '@/modules/labos-authorization/membership-operation-authorization'
import type { LabOSAuthorizationService } from '@/modules/labos-authorization/service'
import type { TenantContext } from '@/platform/organizations'

const tenant: TenantContext = {
	userId: 'user-1',
	memberId: 'actor-member-1',
	memberRole: 'owner',
	staffId: null,
	organizationId: 'organization-1',
	labId: 'lab-1',
	lab: { id: 'lab-1', title: 'Lab One', slug: 'lab-one' },
}

const targetMemberId = '1690baa7-467a-4143-97dc-1e557022f788'

function createAuthorizationServiceMock() {
	return {
		can: vi.fn(),
		require: vi.fn().mockResolvedValue(undefined),
		roleCapabilities: vi.fn(),
	} satisfies LabOSAuthorizationService
}

describe('authoritative membership operation authorization', () => {
	it('requires membership.read for the trusted Member target', async () => {
		const authorizationService = createAuthorizationServiceMock()

		const projection = await authorizeLabOSMembershipOperation(
			{
				boundaryId: 'M-001',
				parsedInput: { memberId: targetMemberId },
				tenant,
				correlationId: 'correlation-1',
			},
			{ authorizationService },
		)

		expect(projection.permission).toBe('membership.read')
		expect(authorizationService.require).toHaveBeenCalledWith({
			actor: {
				userId: 'user-1',
				memberId: 'actor-member-1',
				organizationId: 'organization-1',
				memberRoles: ['owner'],
			},
			permission: 'membership.read',
			target: { type: 'member', id: targetMemberId },
			correlationId: 'correlation-1',
		})
	})

	it('requires typed requested-role intent for role updates', async () => {
		const authorizationService = createAuthorizationServiceMock()

		await authorizeLabOSMembershipOperation(
			{
				boundaryId: 'M-002',
				parsedInput: { memberId: targetMemberId, roles: ['staff'] },
				tenant,
			},
			{
				authorizationService,
				generateCorrelationId: () => 'generated-correlation',
			},
		)

		expect(authorizationService.require).toHaveBeenCalledWith(
			expect.objectContaining({
				permission: 'membership.role.update',
				target: { type: 'member', id: targetMemberId },
				operation: {
					kind: 'membership.role.update',
					requestedRoles: ['staff'],
				},
				correlationId: 'generated-correlation',
			}),
		)
	})

	it('requires membership.remove without accepting caller-owned policy data', async () => {
		const authorizationService = createAuthorizationServiceMock()

		await authorizeLabOSMembershipOperation(
			{
				boundaryId: 'M-003',
				parsedInput: {
					memberId: targetMemberId,
					organizationId: 'organization-attacker',
					permission: 'membership.read',
				},
				tenant,
				correlationId: 'correlation-3',
			},
			{ authorizationService },
		)

		expect(authorizationService.require).toHaveBeenCalledWith(
			expect.objectContaining({
				permission: 'membership.remove',
				target: { type: 'member', id: targetMemberId },
			}),
		)
		expect(authorizationService.require).not.toHaveBeenCalledWith(
			expect.objectContaining({ organizationId: 'organization-attacker' }),
		)
	})

	it('requires typed Member-only invitation intent without a resource target', async () => {
		const authorizationService = createAuthorizationServiceMock()

		await authorizeLabOSMembershipOperation(
			{
				boundaryId: 'M-004',
				parsedInput: { email: 'member@example.test', role: 'staff' },
				tenant,
				correlationId: 'correlation-4',
			},
			{ authorizationService },
		)

		expect(authorizationService.require).toHaveBeenCalledWith({
			actor: expect.objectContaining({ organizationId: 'organization-1' }),
			permission: 'membership.invite',
			operation: {
				kind: 'membership.invite',
				requestedRole: 'staff',
				recipientEmail: 'member@example.test',
			},
			correlationId: 'correlation-4',
		})
	})

	it('propagates denial and never converts it into an allowed projection', async () => {
		const denial = new Error('denied')
		const authorizationService = createAuthorizationServiceMock()
		authorizationService.require.mockRejectedValueOnce(denial)

		await expect(
			authorizeLabOSMembershipOperation(
				{
					boundaryId: 'M-003',
					parsedInput: { memberId: targetMemberId },
					tenant,
				},
				{ authorizationService },
			),
		).rejects.toBe(denial)
	})
})
