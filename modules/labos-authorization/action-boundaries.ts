import 'server-only'

import type { LabRole } from '@/schema/base/enums.base'

import type { LabOSAuthorizationRequest } from './operation-intents'
import type { LabOSOrganizationRole } from './roles'
import { LABOS_AUTHORIZATION_V1_SUPPORTED_PERMISSIONS } from './service'

export const LABOS_ACTION_BOUNDARY_IDS = Object.freeze([
	'A-123',
	'A-124',
	'A-125',
] as const)

export type LabOSActionBoundaryId =
	(typeof LABOS_ACTION_BOUNDARY_IDS)[number]

export const LABOS_ACTION_BOUNDARY_ERROR_CODES = {
	BOUNDARY_NOT_REGISTERED: 'AUTHZ_BOUNDARY_NOT_REGISTERED',
	VALIDATED_INPUT_INVALID: 'AUTHZ_BOUNDARY_VALIDATED_INPUT_INVALID',
	PROJECTOR_FAILED: 'AUTHZ_BOUNDARY_PROJECTOR_FAILED',
} as const

export type LabOSActionBoundaryErrorCode =
	(typeof LABOS_ACTION_BOUNDARY_ERROR_CODES)[keyof typeof LABOS_ACTION_BOUNDARY_ERROR_CODES]

/** Stable, sanitized failure raised for missing or stale server wiring. */
export class LabOSActionBoundaryError extends Error {
	constructor(readonly code: LabOSActionBoundaryErrorCode) {
		super('Authorization boundary projection failed')
		this.name = 'LabOSActionBoundaryError'
	}
}

type StaffInviteAuthorizationRequest =
	LabOSAuthorizationRequest<'staff.access.invite'>

type StaffCreateAuthorizationRequest = LabOSAuthorizationRequest<'staff.create'>

type StaffCreateProjection = Readonly<{
	boundaryId: 'A-123'
	actionName: 'Register-Team-Lab-Staff-Action'
	legacyRequiredRole: 'ADMIN'
	permission: StaffCreateAuthorizationRequest['permission']
}>

type StaffInviteProjection = Readonly<{
	boundaryId: 'A-124'
	actionName: 'Grant-Staff-System-Access'
	legacyRequiredRole: 'ADMIN'
	permission: StaffInviteAuthorizationRequest['permission']
	target: NonNullable<StaffInviteAuthorizationRequest['target']>
	operation: StaffInviteAuthorizationRequest['operation']
}>

type StaffRevokeAuthorizationRequest =
	LabOSAuthorizationRequest<'staff.access.revoke'>

type StaffRevokeProjection = Readonly<{
	boundaryId: 'A-125'
	actionName: 'Revoke-Staff-System-Access'
	legacyRequiredRole: 'ADMIN'
	permission: StaffRevokeAuthorizationRequest['permission']
	target: NonNullable<StaffRevokeAuthorizationRequest['target']>
}>

export type LabOSActionBoundaryProjection =
	| StaffCreateProjection
	| StaffInviteProjection
	| StaffRevokeProjection

export type LabOSActionBoundaryMetadata = Pick<
	LabOSActionBoundaryProjection,
	'boundaryId' | 'actionName' | 'legacyRequiredRole' | 'permission'
>

type LabOSActionBoundaryProjectionById = {
	'A-123': StaffCreateProjection
	'A-124': StaffInviteProjection
	'A-125': StaffRevokeProjection
}

type LabOSActionBoundaryDefinition<Id extends LabOSActionBoundaryId> =
	Readonly<{
		actionName: LabOSActionBoundaryProjectionById[Id]['actionName']
		legacyRequiredRole: LabOSActionBoundaryProjectionById[Id]['legacyRequiredRole']
		permission: LabOSActionBoundaryProjectionById[Id]['permission']
		projectValidatedInput(
			input: unknown,
		): Omit<
			LabOSActionBoundaryProjectionById[Id],
			'boundaryId' | 'actionName' | 'legacyRequiredRole' | 'permission'
		>
	}>

type LabOSActionBoundaryRegistry = {
	[Id in LabOSActionBoundaryId]: LabOSActionBoundaryDefinition<Id>
}

const ORGANIZATION_ROLE_BY_LEGACY_ROLE = Object.freeze({
	OWNER: 'owner',
	ADMIN: 'admin',
	MANAGER: 'manager',
	STAFF: 'staff',
} as const satisfies Readonly<Record<LabRole, LabOSOrganizationRole>>)

function isObject(input: unknown): input is Record<string, unknown> {
	return typeof input === 'object' && input !== null
}

/**
 * A-123 is Organization-scoped, so validated operational Staff fields are not
 * projected into authorization. The kernel receives only the fixed permission
 * and the actor's authoritative Organization context.
 */
function projectStaffCreate(input: unknown): Record<never, never> {
	if (!isObject(input)) {
		throw new LabOSActionBoundaryError(
			LABOS_ACTION_BOUNDARY_ERROR_CODES.VALIDATED_INPUT_INVALID,
		)
	}
	return Object.freeze({})
}

function projectStaffInvite(
	input: unknown,
): Pick<StaffInviteProjection, 'target' | 'operation'> {
	if (
		!isObject(input) ||
		typeof input.staffId !== 'string' ||
		typeof input.email !== 'string' ||
		typeof input.roleToGrant !== 'string' ||
		!Object.hasOwn(ORGANIZATION_ROLE_BY_LEGACY_ROLE, input.roleToGrant)
	) {
		throw new LabOSActionBoundaryError(
			LABOS_ACTION_BOUNDARY_ERROR_CODES.VALIDATED_INPUT_INVALID,
		)
	}

	const requestedRole =
		ORGANIZATION_ROLE_BY_LEGACY_ROLE[
			input.roleToGrant as keyof typeof ORGANIZATION_ROLE_BY_LEGACY_ROLE
		]

	return Object.freeze({
		target: Object.freeze({ type: 'staff', id: input.staffId }),
		operation: Object.freeze({
			kind: 'staff.access.invite',
			requestedRole,
			recipientEmail: input.email,
		}),
	})
}

function projectStaffRevoke(
	input: unknown,
): Pick<StaffRevokeProjection, 'target'> {
	if (!isObject(input) || typeof input.staffId !== 'string') {
		throw new LabOSActionBoundaryError(
			LABOS_ACTION_BOUNDARY_ERROR_CODES.VALIDATED_INPUT_INVALID,
		)
	}

	return Object.freeze({
		target: Object.freeze({ type: 'staff', id: input.staffId }),
	})
}

const LABOS_ACTION_BOUNDARY_REGISTRY = Object.freeze({
	'A-123': Object.freeze({
		actionName: 'Register-Team-Lab-Staff-Action',
		legacyRequiredRole: 'ADMIN',
		permission: 'staff.create',
		projectValidatedInput: projectStaffCreate,
	}),
	'A-124': Object.freeze({
		actionName: 'Grant-Staff-System-Access',
		legacyRequiredRole: 'ADMIN',
		permission: 'staff.access.invite',
		projectValidatedInput: projectStaffInvite,
	}),
	'A-125': Object.freeze({
		actionName: 'Revoke-Staff-System-Access',
		legacyRequiredRole: 'ADMIN',
		permission: 'staff.access.revoke',
		projectValidatedInput: projectStaffRevoke,
	}),
} as const satisfies Readonly<LabOSActionBoundaryRegistry>)

function assertRegisteredBoundariesAreEnabled() {
	const supported = new Set<string>(
		LABOS_AUTHORIZATION_V1_SUPPORTED_PERMISSIONS,
	)
	for (const boundaryId of LABOS_ACTION_BOUNDARY_IDS) {
		const permission = LABOS_ACTION_BOUNDARY_REGISTRY[boundaryId].permission
		if (!supported.has(permission)) {
			throw new Error(
				`Authorization boundary ${boundaryId} uses an inactive permission`,
			)
		}
	}
}

assertRegisteredBoundariesAreEnabled()

/** Returns only immutable server-owned metadata for pre-validation middleware. */
export function getLabOSActionBoundaryMetadata(
	boundaryId: LabOSActionBoundaryId,
): LabOSActionBoundaryMetadata {
	const definition = (
		LABOS_ACTION_BOUNDARY_REGISTRY as unknown as Partial<
			Record<string, LabOSActionBoundaryDefinition<LabOSActionBoundaryId>>
		>
	)[boundaryId]

	if (!definition) {
		throw new LabOSActionBoundaryError(
			LABOS_ACTION_BOUNDARY_ERROR_CODES.BOUNDARY_NOT_REGISTERED,
		)
	}

	return Object.freeze({
		boundaryId,
		actionName: definition.actionName,
		legacyRequiredRole: definition.legacyRequiredRole,
		permission: definition.permission,
	}) as LabOSActionBoundaryMetadata
}

/**
 * Projects schema-validated action input into a trusted authorization target
 * and optional typed operation intent. Call this only from validated server
 * middleware. Client input can never select a permission, target type, policy,
 * Organization, or fact source.
 */
export function projectLabOSActionBoundary(
	boundaryId: 'A-123',
	parsedInput: unknown,
): StaffCreateProjection
export function projectLabOSActionBoundary(
	boundaryId: 'A-124',
	parsedInput: unknown,
): StaffInviteProjection
export function projectLabOSActionBoundary(
	boundaryId: 'A-125',
	parsedInput: unknown,
): StaffRevokeProjection
export function projectLabOSActionBoundary(
	boundaryId: LabOSActionBoundaryId,
	parsedInput: unknown,
): LabOSActionBoundaryProjection
export function projectLabOSActionBoundary(
	boundaryId: LabOSActionBoundaryId,
	parsedInput: unknown,
): LabOSActionBoundaryProjection {
	const definition = (
		LABOS_ACTION_BOUNDARY_REGISTRY as unknown as Partial<
			Record<string, LabOSActionBoundaryDefinition<LabOSActionBoundaryId>>
		>
	)[boundaryId]

	if (!definition) {
		throw new LabOSActionBoundaryError(
			LABOS_ACTION_BOUNDARY_ERROR_CODES.BOUNDARY_NOT_REGISTERED,
		)
	}

	return Object.freeze({
		boundaryId,
		actionName: definition.actionName,
		legacyRequiredRole: definition.legacyRequiredRole,
		permission: definition.permission,
		...definition.projectValidatedInput(parsedInput),
	}) as LabOSActionBoundaryProjection
}
