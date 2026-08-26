import 'server-only'

import type { LabOSAuthorizationRequest } from './operation-intents'
import {
	LABOS_ORGANIZATION_ROLES,
	type LabOSOrganizationRole,
} from './roles'
import { LABOS_AUTHORIZATION_V1_SUPPORTED_PERMISSIONS } from './service'

/**
 * Stable IDs for new membership product operations. They are intentionally
 * separate from the A-xxx legacy action baseline and N-xxx server-page
 * boundaries because these commands have no safe legacy enforcement path.
 */
export const LABOS_MEMBERSHIP_OPERATION_BOUNDARY_IDS = Object.freeze([
	'M-001',
	'M-002',
	'M-003',
	'M-004',
] as const)

export type LabOSMembershipOperationBoundaryId =
	(typeof LABOS_MEMBERSHIP_OPERATION_BOUNDARY_IDS)[number]

export const LABOS_MEMBERSHIP_OPERATION_BOUNDARY_ERROR_CODES = Object.freeze({
	BOUNDARY_NOT_REGISTERED: 'AUTHZ_MEMBERSHIP_BOUNDARY_NOT_REGISTERED',
	VALIDATED_INPUT_INVALID: 'AUTHZ_MEMBERSHIP_VALIDATED_INPUT_INVALID',
} as const)

export class LabOSMembershipOperationBoundaryError extends Error {
	constructor(
		readonly code: (typeof LABOS_MEMBERSHIP_OPERATION_BOUNDARY_ERROR_CODES)[keyof typeof LABOS_MEMBERSHIP_OPERATION_BOUNDARY_ERROR_CODES],
	) {
		super('Membership authorization boundary projection failed')
		this.name = 'LabOSMembershipOperationBoundaryError'
	}
}

type MemberReadRequest = LabOSAuthorizationRequest<'membership.read'>
type MemberRoleUpdateRequest =
	LabOSAuthorizationRequest<'membership.role.update'>
type MemberRemoveRequest = LabOSAuthorizationRequest<'membership.remove'>
type MemberInviteRequest = LabOSAuthorizationRequest<'membership.invite'>

type MemberReadProjection = Readonly<{
	boundaryId: 'M-001'
	boundaryName: 'Read-Organization-Member'
	permission: MemberReadRequest['permission']
	target: NonNullable<MemberReadRequest['target']>
}>

type MemberRoleUpdateProjection = Readonly<{
	boundaryId: 'M-002'
	boundaryName: 'Update-Organization-Member-Role'
	permission: MemberRoleUpdateRequest['permission']
	target: NonNullable<MemberRoleUpdateRequest['target']>
	operation: MemberRoleUpdateRequest['operation']
}>

type MemberRemoveProjection = Readonly<{
	boundaryId: 'M-003'
	boundaryName: 'Remove-Organization-Member'
	permission: MemberRemoveRequest['permission']
	target: NonNullable<MemberRemoveRequest['target']>
}>

type MemberInviteProjection = Readonly<{
	boundaryId: 'M-004'
	boundaryName: 'Invite-Organization-Member'
	permission: MemberInviteRequest['permission']
	operation: MemberInviteRequest['operation']
}>

export type LabOSMembershipOperationBoundaryProjection =
	| MemberReadProjection
	| MemberRoleUpdateProjection
	| MemberRemoveProjection
	| MemberInviteProjection

type ProjectionById = {
	'M-001': MemberReadProjection
	'M-002': MemberRoleUpdateProjection
	'M-003': MemberRemoveProjection
	'M-004': MemberInviteProjection
}

type BoundaryDefinition<Id extends LabOSMembershipOperationBoundaryId> =
	Readonly<{
		boundaryName: ProjectionById[Id]['boundaryName']
		permission: ProjectionById[Id]['permission']
		projectValidatedInput(
			input: unknown,
		): Omit<ProjectionById[Id], 'boundaryId' | 'boundaryName' | 'permission'>
	}>

function isObject(input: unknown): input is Record<string, unknown> {
	return typeof input === 'object' && input !== null
}

function requireMemberId(input: unknown) {
	if (!isObject(input) || typeof input.memberId !== 'string' || !input.memberId) {
		throw new LabOSMembershipOperationBoundaryError(
			LABOS_MEMBERSHIP_OPERATION_BOUNDARY_ERROR_CODES.VALIDATED_INPUT_INVALID,
		)
	}
	return input.memberId
}

function projectMemberTarget(input: unknown) {
	return Object.freeze({
		target: Object.freeze({ type: 'member' as const, id: requireMemberId(input) }),
	})
}

function projectMemberRoleUpdate(input: unknown) {
	const memberId = requireMemberId(input)
	const knownRoles = new Set<string>(LABOS_ORGANIZATION_ROLES)
	if (
		!isObject(input) ||
		!Array.isArray(input.roles) ||
		input.roles.length === 0 ||
		!input.roles.every(
			(role) => typeof role === 'string' && knownRoles.has(role),
		)
	) {
		throw new LabOSMembershipOperationBoundaryError(
			LABOS_MEMBERSHIP_OPERATION_BOUNDARY_ERROR_CODES.VALIDATED_INPUT_INVALID,
		)
	}

	return Object.freeze({
		target: Object.freeze({ type: 'member' as const, id: memberId }),
		operation: Object.freeze({
			kind: 'membership.role.update' as const,
			requestedRoles: Object.freeze([
				...(input.roles as LabOSOrganizationRole[]),
			]),
		}),
	})
}

function projectMemberInvitation(input: unknown) {
	const knownRoles = new Set<string>(['admin', 'manager', 'staff'])
	if (
		!isObject(input) ||
		typeof input.email !== 'string' ||
		!input.email ||
		typeof input.role !== 'string' ||
		!knownRoles.has(input.role)
	) {
		throw new LabOSMembershipOperationBoundaryError(
			LABOS_MEMBERSHIP_OPERATION_BOUNDARY_ERROR_CODES.VALIDATED_INPUT_INVALID,
		)
	}

	return Object.freeze({
		operation: Object.freeze({
			kind: 'membership.invite' as const,
			requestedRole: input.role as Exclude<LabOSOrganizationRole, 'owner'>,
			recipientEmail: input.email,
		}),
	})
}

const LABOS_MEMBERSHIP_OPERATION_BOUNDARY_REGISTRY = Object.freeze({
	'M-001': Object.freeze({
		boundaryName: 'Read-Organization-Member',
		permission: 'membership.read',
		projectValidatedInput: projectMemberTarget,
	}),
	'M-002': Object.freeze({
		boundaryName: 'Update-Organization-Member-Role',
		permission: 'membership.role.update',
		projectValidatedInput: projectMemberRoleUpdate,
	}),
	'M-003': Object.freeze({
		boundaryName: 'Remove-Organization-Member',
		permission: 'membership.remove',
		projectValidatedInput: projectMemberTarget,
	}),
	'M-004': Object.freeze({
		boundaryName: 'Invite-Organization-Member',
		permission: 'membership.invite',
		projectValidatedInput: projectMemberInvitation,
	}),
} as const satisfies Readonly<{
	[Id in LabOSMembershipOperationBoundaryId]: BoundaryDefinition<Id>
}>)

function assertMembershipBoundariesAreEnabled() {
	const supported = new Set<string>(
		LABOS_AUTHORIZATION_V1_SUPPORTED_PERMISSIONS,
	)
	for (const boundaryId of LABOS_MEMBERSHIP_OPERATION_BOUNDARY_IDS) {
		const permission =
			LABOS_MEMBERSHIP_OPERATION_BOUNDARY_REGISTRY[boundaryId].permission
		if (!supported.has(permission)) {
			throw new Error(
				`Membership boundary ${boundaryId} uses an inactive permission`,
			)
		}
	}
}

assertMembershipBoundariesAreEnabled()

export function projectLabOSMembershipOperationBoundary(
	boundaryId: 'M-001',
	input: unknown,
): MemberReadProjection
export function projectLabOSMembershipOperationBoundary(
	boundaryId: 'M-002',
	input: unknown,
): MemberRoleUpdateProjection
export function projectLabOSMembershipOperationBoundary(
	boundaryId: 'M-003',
	input: unknown,
): MemberRemoveProjection
export function projectLabOSMembershipOperationBoundary(
	boundaryId: 'M-004',
	input: unknown,
): MemberInviteProjection
export function projectLabOSMembershipOperationBoundary(
	boundaryId: LabOSMembershipOperationBoundaryId,
	input: unknown,
): LabOSMembershipOperationBoundaryProjection
export function projectLabOSMembershipOperationBoundary(
	boundaryId: LabOSMembershipOperationBoundaryId,
	input: unknown,
): LabOSMembershipOperationBoundaryProjection {
	const definition = (
		LABOS_MEMBERSHIP_OPERATION_BOUNDARY_REGISTRY as unknown as Partial<
			Record<string, BoundaryDefinition<LabOSMembershipOperationBoundaryId>>
		>
	)[boundaryId]
	if (!definition) {
		throw new LabOSMembershipOperationBoundaryError(
			LABOS_MEMBERSHIP_OPERATION_BOUNDARY_ERROR_CODES.BOUNDARY_NOT_REGISTERED,
		)
	}

	return Object.freeze({
		boundaryId,
		boundaryName: definition.boundaryName,
		permission: definition.permission,
		...definition.projectValidatedInput(input),
	}) as LabOSMembershipOperationBoundaryProjection
}
