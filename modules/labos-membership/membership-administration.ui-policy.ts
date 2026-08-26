import type { LabOSOrganizationRole } from '@/modules/labos-authorization/roles'

export type MembershipAdministrationViewer = Readonly<{
	memberId: string
	roles: readonly LabOSOrganizationRole[]
}>

export type MembershipAdministrationUiTarget = Readonly<{
	memberId: string
	roles: readonly LabOSOrganizationRole[]
	unknownRoleCount: number
	hasStaffProfile: boolean
}>

export type MembershipAdministrationUiPolicy = Readonly<{
	roleOptions: readonly Exclude<LabOSOrganizationRole, 'owner'>[]
	canUpdateRole: boolean
	canRemove: boolean
	isSelf: boolean
	isOwnerProtected: boolean
	blockReason:
		| 'self'
		| 'owner'
		| 'role_state'
		| 'linked_staff'
		| 'permission'
		| null
}>

const OWNER_ROLE_OPTIONS = Object.freeze(['admin', 'manager', 'staff'] as const)
const ADMIN_ROLE_OPTIONS = Object.freeze(['staff'] as const)
const NO_ROLE_OPTIONS = Object.freeze([])

/**
 * Non-authoritative UI projection of the reviewed M-002/M-003 rules.
 *
 * It only decides which controls to render. The server reloads target facts and
 * enforces Authorization V1 before every Better Auth mutation; callers must
 * never treat this result as an authorization decision.
 */
export function getMembershipAdministrationUiPolicy(
	viewer: MembershipAdministrationViewer,
	target: MembershipAdministrationUiTarget,
): MembershipAdministrationUiPolicy {
	const roleOptions = viewer.roles.includes('owner')
		? OWNER_ROLE_OPTIONS
		: viewer.roles.includes('admin')
			? ADMIN_ROLE_OPTIONS
			: NO_ROLE_OPTIONS
	const hasPermission = roleOptions.length > 0
	const isSelf = viewer.memberId === target.memberId
	const isOwner = target.roles.includes('owner')
	const roleStateIsSafe =
		target.unknownRoleCount === 0 && target.roles.length === 1

	let blockReason: MembershipAdministrationUiPolicy['blockReason'] = null
	if (!hasPermission) blockReason = 'permission'
	else if (isSelf) blockReason = 'self'
	else if (isOwner) blockReason = 'owner'
	else if (!roleStateIsSafe) blockReason = 'role_state'
	else if (target.hasStaffProfile) blockReason = 'linked_staff'

	const canUpdateRole =
		hasPermission && !isSelf && !isOwner && roleStateIsSafe
	const canRemove = canUpdateRole && !target.hasStaffProfile

	return Object.freeze({
		roleOptions,
		canUpdateRole,
		canRemove,
		isSelf,
		isOwnerProtected: isOwner,
		blockReason,
	})
}
