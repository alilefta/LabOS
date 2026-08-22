import type { LabRole } from '@/schema/base/enums.base'

const LEGACY_ROLE_PRECEDENCE: readonly LabRole[] = [
	'OWNER',
	'MANAGER',
	'ADMIN',
	'STAFF',
]

const ORGANIZATION_TO_LEGACY_ROLE: Record<string, LabRole> = {
	owner: 'OWNER',
	manager: 'MANAGER',
	admin: 'ADMIN',
	staff: 'STAFF',
	member: 'STAFF',
}

/**
 * Temporary bridge from Better Auth Member roles to the existing role gates.
 * Better Auth can encode multiple roles as a comma-delimited string, so the
 * highest known compatibility role wins. Unknown roles receive STAFF, the
 * least privileged legacy role. Delete this with `requireRoleMiddleware` when
 * platform permissions become authoritative.
 */
export function toLegacyLabRole(memberRole: string): LabRole {
	const mappedRoles = memberRole
		.split(',')
		.map((role) => ORGANIZATION_TO_LEGACY_ROLE[role.trim().toLowerCase()])
		.filter((role): role is LabRole => Boolean(role))

	return (
		LEGACY_ROLE_PRECEDENCE.find((role) => mappedRoles.includes(role)) ?? 'STAFF'
	)
}
