import { describe, expect, it, vi } from 'vitest'

import { createMembershipAdministrationService } from '@/modules/labos-membership/membership-administration.service'
import type { TenantContext } from '@/platform/organizations'

const memberId = '1690baa7-467a-4143-97dc-1e557022f788'
const tenant: TenantContext = {
	userId: 'actor-user',
	memberId: 'actor-member',
	memberRole: 'owner',
	staffId: null,
	organizationId: 'organization-a',
	labId: 'lab-a',
	lab: { id: 'lab-a', title: 'Lab A', slug: 'lab-a' },
}

function createHarness() {
	const authorize = vi.fn().mockResolvedValue({})
	const gateway = {
		invite: vi.fn().mockResolvedValue({ invitationId: 'invitation-safe' }),
		updateRole: vi.fn().mockResolvedValue(undefined),
		remove: vi.fn().mockResolvedValue(undefined),
	}
	const monitor = { record: vi.fn() }
	let now = 10
	const service = createMembershipAdministrationService({
		authorize,
		gateway,
		monitor,
		generateCorrelationId: () => 'correlation-membership',
		now: () => now++,
	})
	const context = {
		tenant,
		requestHeaders: new Headers({ cookie: 'private-session' }),
	}

	return { service, authorize, gateway, monitor, context }
}

describe('dual-authority membership administration service', () => {
	it('authorizes a Member-only invitation before invoking Better Auth', async () => {
		const { service, authorize, gateway, monitor, context } = createHarness()

		await expect(
			service.invite(
				{ email: '  NEW.MEMBER@example.test ', role: 'staff' },
				context,
			),
		).resolves.toEqual({
			status: 'invitation_sent',
			invitationId: 'invitation-safe',
		})
		expect(authorize).toHaveBeenCalledWith({
			boundaryId: 'M-004',
			parsedInput: { email: 'new.member@example.test', role: 'staff' },
			tenant,
			correlationId: 'correlation-membership',
		})
		expect(gateway.invite).toHaveBeenCalledWith({
			organizationId: 'organization-a',
			email: 'new.member@example.test',
			role: 'staff',
			requestHeaders: context.requestHeaders,
		})
		expect(authorize.mock.invocationCallOrder[0]).toBeLessThan(
			gateway.invite.mock.invocationCallOrder[0],
		)
		expect(monitor.record).toHaveBeenNthCalledWith(
			1,
			expect.objectContaining({
				boundaryId: 'M-004',
				permission: 'membership.invite',
				outcome: 'started',
			}),
		)
	})

	it('authorizes role intent before invoking Better Auth', async () => {
		const { service, authorize, gateway, context } = createHarness()

		await expect(
			service.updateRole({ memberId, roles: ['staff'] }, context),
		).resolves.toEqual({ status: 'role_updated' })
		expect(authorize).toHaveBeenCalledWith({
			boundaryId: 'M-002',
			parsedInput: { memberId, roles: ['staff'] },
			tenant,
			correlationId: 'correlation-membership',
		})
		expect(gateway.updateRole).toHaveBeenCalledWith({
			organizationId: 'organization-a',
			memberId,
			roles: ['staff'],
			requestHeaders: context.requestHeaders,
		})
		expect(authorize.mock.invocationCallOrder[0]).toBeLessThan(
			gateway.updateRole.mock.invocationCallOrder[0],
		)
	})

	it('authorizes removal before invoking Better Auth', async () => {
		const { service, authorize, gateway, monitor, context } = createHarness()

		await expect(service.remove({ memberId }, context)).resolves.toEqual({
			status: 'membership_removed',
		})
		expect(authorize).toHaveBeenCalledWith(
			expect.objectContaining({ boundaryId: 'M-003' }),
		)
		expect(gateway.remove).toHaveBeenCalledWith({
			organizationId: 'organization-a',
			memberId,
			requestHeaders: context.requestHeaders,
		})
		expect(monitor.record).toHaveBeenNthCalledWith(1, {
			event: 'labos.membership_administration',
			boundaryId: 'M-003',
			permission: 'membership.remove',
			organizationId: 'organization-a',
			correlationId: 'correlation-membership',
			outcome: 'started',
		})
		expect(monitor.record).toHaveBeenLastCalledWith(
			expect.objectContaining({
				boundaryId: 'M-003',
				correlationId: 'correlation-membership',
				outcome: 'completed',
				phase: 'provider',
			}),
		)
	})

	it('never calls Better Auth after a V1 denial', async () => {
		const { service, authorize, gateway, context } = createHarness()
		const denial = new Error('denied')
		authorize.mockRejectedValueOnce(denial)

		await expect(service.remove({ memberId }, context)).rejects.toBe(denial)
		expect(gateway.remove).not.toHaveBeenCalled()
	})

	it('rejects unknown roles and caller-owned tenant metadata before authorization', async () => {
		const { service, authorize, gateway, context } = createHarness()

		await expect(
			service.updateRole(
				{
					memberId,
					roles: ['staff'],
					organizationId: 'organization-attacker',
				},
				context,
			),
		).rejects.toBeDefined()
		await expect(
			service.updateRole({ memberId, roles: ['unknown'] }, context),
		).rejects.toBeDefined()
		expect(authorize).not.toHaveBeenCalled()
		expect(gateway.updateRole).not.toHaveBeenCalled()
		await expect(
			service.invite(
				{
					email: 'member@example.test',
					role: 'staff',
					staffId: 'forbidden-staff-link',
				},
				context,
			),
		).rejects.toBeDefined()
		expect(gateway.invite).not.toHaveBeenCalled()
	})

	it('emits sanitized provider-failure telemetry', async () => {
		const { service, gateway, monitor, context } = createHarness()
		gateway.remove.mockRejectedValueOnce(
			new Error(`provider failed for ${memberId} private@example.test`),
		)

		await expect(service.remove({ memberId }, context)).rejects.toBeDefined()
		const failed = monitor.record.mock.calls.at(-1)?.[0]
		expect(failed).toMatchObject({
			event: 'labos.membership_administration',
			boundaryId: 'M-003',
			permission: 'membership.remove',
			organizationId: 'organization-a',
			correlationId: 'correlation-membership',
			outcome: 'failed',
			phase: 'provider',
		})
		const serialized = JSON.stringify(failed)
		expect(serialized).not.toContain(memberId)
		expect(serialized).not.toContain('private@example.test')
		expect(serialized).not.toContain('private-session')
	})
})
