import { describe, expect, it, vi } from 'vitest'

import {
	assertStaffAccessRevocationAllowed,
	revokeStaffOrganizationAccess,
	type StaffAccessRevocationDependencies,
	type StaffAccessRevocationMonitorEvent,
} from '@/lib/staff-access-revocation'

const input = {
	tenant: { organizationId: 'organization-1', labId: 'lab-1' },
	staffId: 'staff-1',
	memberId: 'member-1',
	requestHeaders: new Headers({ cookie: 'session=redacted' }),
}

function createHarness(options?: {
	removeError?: Error
	unlinkError?: Error
	unlinkStatus?: 'unlinked' | 'existing'
}) {
	const events: StaffAccessRevocationMonitorEvent[] = []
	const removeMembership = vi.fn(async () => {
		if (options?.removeError) throw options.removeError
	})
	const unlinkStaff = vi.fn(async () => {
		if (options?.unlinkError) throw options.unlinkError
		return {
			status: options?.unlinkStatus ?? ('existing' as const),
			staffId: input.staffId,
			memberId: null,
		}
	})
	const dependencies: StaffAccessRevocationDependencies = {
		removeMembership,
		unlinkStaff,
		monitor: { record: vi.fn((event) => events.push(event)) },
		now: vi.fn().mockReturnValueOnce(100).mockReturnValue(112),
	}
	return { dependencies, removeMembership, unlinkStaff, events }
}

describe('revokeStaffOrganizationAccess', () => {
	it('removes membership before verifying the staff unlink', async () => {
		const harness = createHarness({ unlinkStatus: 'unlinked' })
		const callOrder: string[] = []
		harness.removeMembership.mockImplementation(async () => {
			callOrder.push('membership')
		})
		harness.unlinkStaff.mockImplementation(async () => {
			callOrder.push('staff')
			return { status: 'unlinked', staffId: input.staffId, memberId: null }
		})

		await expect(
			revokeStaffOrganizationAccess(input, harness.dependencies),
		).resolves.toEqual({
			status: 'membership_removed',
			staffLinkStatus: 'unlinked',
		})
		expect(callOrder).toEqual(['membership', 'staff'])
		expect(harness.unlinkStaff).toHaveBeenCalledWith({
			tenant: input.tenant,
			staffId: input.staffId,
		})
	})

	it('accepts the database foreign-key unlink as an idempotent success', async () => {
		const harness = createHarness({ unlinkStatus: 'existing' })

		await expect(
			revokeStaffOrganizationAccess(input, harness.dependencies),
		).resolves.toMatchObject({
			status: 'membership_removed',
			staffLinkStatus: 'already_unlinked',
		})
		expect(harness.events.at(-1)).toMatchObject({
			outcome: 'completed',
			phase: 'staff_unlink',
		})
	})

	it('does not unlink staff when membership removal fails', async () => {
		const failure = new Error('Better Auth rejected removal')
		const harness = createHarness({ removeError: failure })

		await expect(
			revokeStaffOrganizationAccess(input, harness.dependencies),
		).rejects.toBe(failure)
		expect(harness.unlinkStaff).not.toHaveBeenCalled()
		expect(harness.events.at(-1)).toMatchObject({
			outcome: 'failed',
			phase: 'membership_removal',
		})
	})

	it('keeps access revoked and reports reconciliation when verification fails', async () => {
		const harness = createHarness({ unlinkError: new Error('database unavailable') })

		await expect(
			revokeStaffOrganizationAccess(input, harness.dependencies),
		).resolves.toEqual({
			status: 'membership_removed',
			staffLinkStatus: 'pending_reconciliation',
		})
		expect(harness.events.at(-1)).toMatchObject({
			outcome: 'partial',
			phase: 'staff_unlink',
		})
	})
})

describe('assertStaffAccessRevocationAllowed', () => {
	it('prevents self-lockout', () => {
		expect(() =>
			assertStaffAccessRevocationAllowed({
				actorUserId: 'user-1',
				actorMemberRole: 'owner',
				targetUserId: 'user-1',
				targetMemberRole: 'owner',
			}),
		).toThrow(/Self-lockout/)
	})

	it('prevents non-owners from revoking an owner', () => {
		expect(() =>
			assertStaffAccessRevocationAllowed({
				actorUserId: 'user-1',
				actorMemberRole: 'manager',
				targetUserId: 'user-2',
				targetMemberRole: 'owner',
			}),
		).toThrow(/Only an Organization owner/)
	})

	it('allows an owner to revoke another owner', () => {
		expect(() =>
			assertStaffAccessRevocationAllowed({
				actorUserId: 'user-1',
				actorMemberRole: 'owner',
				targetUserId: 'user-2',
				targetMemberRole: 'owner',
			}),
		).not.toThrow()
	})

	it('allows an administrator to revoke an ordinary member', () => {
		expect(() =>
			assertStaffAccessRevocationAllowed({
				actorUserId: 'user-1',
				actorMemberRole: 'admin',
				targetUserId: 'user-2',
				targetMemberRole: 'staff',
			}),
		).not.toThrow()
	})
})
