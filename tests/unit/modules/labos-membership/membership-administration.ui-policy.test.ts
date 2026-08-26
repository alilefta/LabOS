import { describe, expect, it } from 'vitest'

import type { LabOSOrganizationRole } from '@/modules/labos-authorization/roles'
import { getMembershipAdministrationUiPolicy } from '@/modules/labos-membership/membership-administration.ui-policy'

const actorRoles: readonly LabOSOrganizationRole[] = [
	'owner',
	'admin',
	'manager',
	'staff',
]

function policy(
	actorRole: LabOSOrganizationRole,
	targetRole: LabOSOrganizationRole,
	overrides: Partial<{
		viewerMemberId: string
		targetMemberId: string
		unknownRoleCount: number
		hasStaffProfile: boolean
	}> = {},
) {
	return getMembershipAdministrationUiPolicy(
		{
			memberId: overrides.viewerMemberId ?? `viewer-${actorRole}`,
			roles: [actorRole],
		},
		{
			memberId: overrides.targetMemberId ?? `target-${targetRole}`,
			roles: [targetRole],
			unknownRoleCount: overrides.unknownRoleCount ?? 0,
			hasStaffProfile: overrides.hasStaffProfile ?? false,
		},
	)
}

describe('membership administration UI projection', () => {
	it('exposes the approved single-role assignment ceilings', () => {
		expect(policy('owner', 'staff').roleOptions).toEqual([
			'admin',
			'manager',
			'staff',
		])
		expect(policy('admin', 'manager').roleOptions).toEqual(['staff'])
		expect(policy('manager', 'staff').roleOptions).toEqual([])
		expect(policy('staff', 'staff').roleOptions).toEqual([])
	})

	it.each(actorRoles)('protects Owner targets from %s controls', (actorRole) => {
		const result = policy(actorRole, 'owner')
		expect(result.canUpdateRole).toBe(false)
		expect(result.canRemove).toBe(false)
	})

	it('blocks self and malformed role state in the UI', () => {
		const self = policy('owner', 'staff', {
				viewerMemberId: 'same',
				targetMemberId: 'same',
			})
		expect(self.blockReason).toBe('self')
		expect(self.isSelf).toBe(true)
		expect(self.isOwnerProtected).toBe(false)
		expect(
			policy('owner', 'staff', { unknownRoleCount: 1 }).blockReason,
		).toBe('role_state')
	})

	it('exposes self and ownership protection independently for a current Owner', () => {
		const result = policy('owner', 'owner', {
			viewerMemberId: 'same',
			targetMemberId: 'same',
		})

		expect(result.canUpdateRole).toBe(false)
		expect(result.canRemove).toBe(false)
		expect(result.isSelf).toBe(true)
		expect(result.isOwnerProtected).toBe(true)
	})

	it('allows role updates but routes linked Staff removal to A-125', () => {
		const result = policy('owner', 'staff', { hasStaffProfile: true })
		expect(result.canUpdateRole).toBe(true)
		expect(result.canRemove).toBe(false)
		expect(result.blockReason).toBe('linked_staff')
	})

	it('shows Member-only removal only to Owner and Admin', () => {
		for (const actorRole of actorRoles) {
			const result = policy(actorRole, 'staff')
			expect(result.canRemove).toBe(
				actorRole === 'owner' || actorRole === 'admin',
			)
		}
	})
})
