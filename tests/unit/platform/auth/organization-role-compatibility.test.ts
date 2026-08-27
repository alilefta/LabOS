import { describe, expect, it } from 'vitest'

import {
	authorizationV1EnforcementOrganizationAccess,
	getLabOSOrganizationAccessForMode,
	organizationAccess,
} from '@/platform/auth/organization-access'

type OrganizationRoleName = keyof typeof organizationAccess.roles

function can(
	profile: typeof organizationAccess,
	role: OrganizationRoleName,
	request: Record<string, readonly string[]>,
) {
	return profile.roles[role].authorize(request).success
}

describe('Better Auth and LabOS Authorization V1 role compatibility', () => {
	it.each([
		['owner', true, true, true],
		['admin', true, true, true],
		['manager', false, false, false],
		['staff', false, false, false],
	] as const)(
		'enforcement profile gives %s invite/update/delete = %s/%s/%s',
		(role, invitationCreate, memberUpdate, memberDelete) => {
			expect(
				can(authorizationV1EnforcementOrganizationAccess, role, {
					invitation: ['create'],
				}),
			).toBe(invitationCreate)
			expect(
				can(authorizationV1EnforcementOrganizationAccess, role, {
					member: ['update'],
				}),
			).toBe(memberUpdate)
			expect(
				can(authorizationV1EnforcementOrganizationAccess, role, {
					member: ['delete'],
				}),
			).toBe(memberDelete)
		},
	)

	it('retains Manager provider capabilities only in the active shadow profile', () => {
		expect(can(organizationAccess, 'manager', { invitation: ['create'] })).toBe(
			true,
		)
		expect(can(organizationAccess, 'manager', { member: ['update'] })).toBe(
			true,
		)
		expect(can(organizationAccess, 'manager', { member: ['delete'] })).toBe(
			true,
		)
	})

	it('keeps Staff without Better Auth management capabilities in both profiles', () => {
		for (const profile of [
			organizationAccess,
			authorizationV1EnforcementOrganizationAccess,
		]) {
			expect(can(profile, 'staff', { invitation: ['create'] })).toBe(false)
			expect(can(profile, 'staff', { member: ['update'] })).toBe(false)
			expect(can(profile, 'staff', { member: ['delete'] })).toBe(false)
		}
	})

	it('selects the narrowed provider profile only for V1 mode', () => {
		expect(getLabOSOrganizationAccessForMode('shadow')).toBe(organizationAccess)
		expect(getLabOSOrganizationAccessForMode('legacy-rollback')).toBe(
		organizationAccess,
	)
		expect(getLabOSOrganizationAccessForMode('v1')).toBe(
		authorizationV1EnforcementOrganizationAccess,
	)
	})
})
