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

/**
 * Enforcement profile for the approved V1 matrix. Manager and Staff retain
 * only ordinary membership capabilities; product authorization decides every
 * LabOS access-management operation before Better Auth is called.
 *
 * This profile is exported for compatibility tests but is not installed while
 * A-124/A-125 remain legacy-authoritative in shadow mode.
 */
export const authorizationV1ManagerOrganizationRole = memberAc

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

export const authorizationV1EnforcementOrganizationAccess = {
	ac: defaultAc as AccessControl,
	roles: {
		owner: ownerAc as Role,
		admin: adminAc as Role,
		manager: authorizationV1ManagerOrganizationRole as Role,
		staff: staffOrganizationRole as Role,
	},
} as const
