import { describe, expect, it } from 'vitest'

import { ERRORS } from '@/lib/errors'
import {
	authorize,
	getPermissions,
	type UserContext,
} from '@/lib/permissions/access-control'

function createUser(overrides: Partial<UserContext> = {}): UserContext {
	return {
		role: 'STAFF',
		staffId: 'staff-123',
		labId: 'lab-123',
		...overrides,
	}
}

describe('access control', () => {
	it.each(['OWNER', 'ADMIN', 'MANAGER'] as const)(
		'grants the complete Category 1 management matrix to %s',
		(role) => {
			const permissions = getPermissions(createUser({ role }))

			expect(permissions).toMatchObject({
				canViewManagementDashboard: true,
				canCreateCases: true,
				canEditCaseOrder: true,
				canAssignCaseStaff: true,
				canManageClinics: true,
				canManageCatalog: true,
				canViewFinancials: true,
				canManageFinancials: true,
				canManageTeam: true,
				canManageLabSettings: true,
				canArchiveCase: true,
				canArchivePatient: true,
				canUpdateAssignedCaseStatus: true,
				canDeleteCase: false,
			})
		},
	)

	it('reserves billing ownership for the owner', () => {
		expect(getPermissions(createUser({ role: 'OWNER' })).canManageBilling).toBe(
			true,
		)
		expect(getPermissions(createUser({ role: 'ADMIN' })).canManageBilling).toBe(
			false,
		)
		expect(
			getPermissions(createUser({ role: 'MANAGER' })).canManageBilling,
		).toBe(false)
	})

	it.each(['TECHNICIAN', 'ACCOUNTANT', 'RECEPTIONIST'] as const)(
		'does not grant Staff financial or management access based on the %s job category',
		(staffCategory) => {
			const permissions = getPermissions(createUser({ staffCategory }))

			expect(permissions).toMatchObject({
				isManagement: false,
				isStaff: true,
				canViewManagementDashboard: false,
				canCreateCases: false,
				canEditCaseOrder: false,
				canAssignCaseStaff: false,
				canManageClinics: false,
				canManageCatalog: false,
				canViewFinancials: false,
				canManageFinancials: false,
				canManageTeam: false,
				canManageLabSettings: false,
				canManageBilling: false,
				canArchiveCase: false,
				canArchivePatient: false,
				canViewAssignedWork: true,
				canUpdateAssignedCaseStatus: true,
				canDeleteCase: false,
			})
		},
	)

	it('rejects a forbidden action through the authorization guard', () => {
		const gate = authorize(createUser({ staffCategory: 'TECHNICIAN' }))

		expect(() => gate.throwIfCannot('canCreateCases')).toThrow(
			ERRORS.FORBIDDEN,
		)
	})
})
