import {
	adminAc,
	defaultAc,
	memberAc,
	ownerAc,
} from 'better-auth/plugins/organization/access'
import type { AccessControl, Role } from 'better-auth/plugins/access'

/**
 * Better Auth Organization roles govern membership-management operations only.
 * LabOS product permissions remain the responsibility of Authorization V1.
 */
export const managerOrganizationRole = defaultAc.newRole({
	organization: [],
	member: ['create', 'update', 'delete'],
	invitation: ['create', 'cancel'],
	team: [],
	ac: ['read'],
})

export const staffOrganizationRole = memberAc

export const organizationAccess = {
	// Better Auth 1.5's public option types erase the concrete statement generic.
	// Widen only at this library boundary; role construction above remains typed.
	ac: defaultAc as AccessControl,
	roles: {
		owner: ownerAc as Role,
		admin: adminAc as Role,
		manager: managerOrganizationRole as Role,
		staff: staffOrganizationRole as Role,
	},
} as const
