import type { AuthorizationRequest } from '@/platform/authorization'

import type { LabOSPermission } from './permissions'
import type { LabOSResourceType } from './resource-types'
import type { LabOSOrganizationRole } from './roles'

/**
 * Exact operation inputs that policies may inspect in addition to authoritative
 * database facts. This is deliberately a closed permission map, not an
 * extensible attributes bag. Values still receive runtime validation because
 * TypeScript types do not protect JavaScript or stale callers.
 */
export type LabOSAuthorizationOperationMap = {
	'membership.invite': Readonly<{
		kind: 'membership.invite'
		requestedRole: Exclude<LabOSOrganizationRole, 'owner'>
		recipientEmail: string
	}>
	'staff.access.invite': Readonly<{
		kind: 'staff.access.invite'
		requestedRole: LabOSOrganizationRole
		recipientEmail: string
	}>
	'membership.role.update': Readonly<{
		kind: 'membership.role.update'
		requestedRoles: readonly LabOSOrganizationRole[]
	}>
}

export type LabOSAuthorizationRequest<Permission extends LabOSPermission> =
	AuthorizationRequest<
		Permission,
		LabOSResourceType,
		LabOSAuthorizationOperationMap
	>
