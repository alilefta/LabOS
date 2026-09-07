import 'server-only'

import { z } from 'zod/v4'

import { LABOS_PERMISSION_DEFINITION_REGISTRY } from './permission-definitions'
import type { LabOSPermission } from './permissions'

/**
 * Stable IDs for protected server boundaries that are not part of the legacy
 * safe-action inventory. The N-prefix keeps these records distinct from the
 * mechanically generated A-xxx action IDs.
 */
export const LABOS_NON_ACTION_BOUNDARY_IDS = Object.freeze([
	'N-001',
	'N-002',
	'N-API-002',
] as const)

export type LabOSNonActionBoundaryId =
	(typeof LABOS_NON_ACTION_BOUNDARY_IDS)[number]

export const LABOS_NON_ACTION_BOUNDARY_ERROR_CODES = {
	BOUNDARY_NOT_REGISTERED: 'AUTHZ_NON_ACTION_BOUNDARY_NOT_REGISTERED',
	VALIDATED_INPUT_INVALID: 'AUTHZ_NON_ACTION_VALIDATED_INPUT_INVALID',
} as const

export class LabOSNonActionBoundaryError extends Error {
	constructor(
		readonly code: (typeof LABOS_NON_ACTION_BOUNDARY_ERROR_CODES)[keyof typeof LABOS_NON_ACTION_BOUNDARY_ERROR_CODES] =
			LABOS_NON_ACTION_BOUNDARY_ERROR_CODES.BOUNDARY_NOT_REGISTERED,
	) {
		super(
			code === LABOS_NON_ACTION_BOUNDARY_ERROR_CODES.BOUNDARY_NOT_REGISTERED
				? 'Authorization boundary is not registered'
				: 'Authorization boundary input is invalid',
		)
		this.name = 'LabOSNonActionBoundaryError'
	}
}

export type N001TeamDirectoryBoundaryMetadata = Readonly<{
	boundaryId: 'N-001'
	kind: 'server-page'
	boundaryName: 'Team-And-Roles-Directory'
	route: '/settings/team'
	source: 'app/(main)/settings/team/page.tsx'
	permission: 'membership.list'
	legacyAccess: 'verified-tenant-member'
	wave: 'membership'
}>

export type N002PaystubBoundaryMetadata = Readonly<{
	boundaryId: 'N-002'
	kind: 'server-page'
	boundaryName: 'Staff-Payout-Paystub'
	route: '/paystub/[staffId]/[payoutId]'
	source: 'app/(print)/paystub/[staffId]/[payoutId]/page.tsx'
	permissions: readonly ['payout.read', 'payout.self.read']
	legacyAccess: 'public-identifiers'
	migration: 'LEGACY_PUBLIC -> V1_AUTHENTICATED_RESOURCE_SCOPED'
	wave: 'financials'
}>

export type LabOSNonActionBoundaryMetadata =
	| N001TeamDirectoryBoundaryMetadata
	| N002PaystubBoundaryMetadata
	| NApi002DentistDetailBoundaryMetadata

export type NApi002DentistDetailBoundaryMetadata = Readonly<{
	boundaryId: 'N-API-002'
	kind: 'route-handler'
	boundaryName: 'Dentist-Detail-API'
	route: '/api/dentists/[dentistId]'
	source: 'app/api/dentists/[dentistId]/route.ts'
	permission: 'dentist.read'
	legacyAccess: 'verified-tenant-member'
	migration: 'LEGACY_TENANT_ONLY -> V1_AUTHENTICATED_RESOURCE_SCOPED'
	wave: 'operations'
}>

const LABOS_NON_ACTION_BOUNDARY_REGISTRY = Object.freeze({
	'N-001': Object.freeze({
		kind: 'server-page',
		boundaryName: 'Team-And-Roles-Directory',
		route: '/settings/team',
		source: 'app/(main)/settings/team/page.tsx',
		permission: 'membership.list',
		legacyAccess: 'verified-tenant-member',
		wave: 'membership',
	}),
	'N-002': Object.freeze({
		kind: 'server-page',
		boundaryName: 'Staff-Payout-Paystub',
		route: '/paystub/[staffId]/[payoutId]',
		source: 'app/(print)/paystub/[staffId]/[payoutId]/page.tsx',
		permissions: Object.freeze(['payout.read', 'payout.self.read'] as const),
		legacyAccess: 'public-identifiers',
		migration: 'LEGACY_PUBLIC -> V1_AUTHENTICATED_RESOURCE_SCOPED',
		wave: 'financials',
	}),
	'N-API-002': Object.freeze({
		kind: 'route-handler',
		boundaryName: 'Dentist-Detail-API',
		route: '/api/dentists/[dentistId]',
		source: 'app/api/dentists/[dentistId]/route.ts',
		permission: 'dentist.read',
		legacyAccess: 'verified-tenant-member',
		migration: 'LEGACY_TENANT_ONLY -> V1_AUTHENTICATED_RESOURCE_SCOPED',
		wave: 'operations',
	}),
} as const)

export const N002PaystubInputSchema = z.object({
	staffId: z.string().uuid('Invalid Staff ID format'),
	payoutId: z.string().uuid('Invalid Payout ID format'),
})

export type N002PaystubBoundaryProjection = Readonly<{
	boundaryId: 'N-002'
	boundaryName: 'Staff-Payout-Paystub'
	target: Readonly<{ type: 'payout'; id: string }>
	operation: Readonly<{
		kind: 'payout.paystub.read'
		routeStaffId: string
	}>
}>

export const NApi002DentistDetailInputSchema = z.object({
	dentistId: z.string().uuid('Invalid Dentist ID format'),
	clinicId: z.string().uuid('Invalid Clinic ID format'),
})

export type NApi002DentistDetailBoundaryProjection = Readonly<{
	boundaryId: 'N-API-002'
	boundaryName: 'Dentist-Detail-API'
	permission: 'dentist.read'
	target: Readonly<{ type: 'dentist'; id: string }>
	operation: Readonly<{
		kind: 'dentist.detail.read'
		routeClinicId: string
	}>
}>

/**
 * Verifies that registry permissions come from the authoritative catalog and
 * that collection/page boundaries do not silently become resource-scoped.
 * Activation in the concrete service is deliberately deferred to step 2.
 */
function assertRegisteredNonActionBoundariesUseTrustedDefinitions(): void {
	for (const boundaryId of LABOS_NON_ACTION_BOUNDARY_IDS) {
		const registered = LABOS_NON_ACTION_BOUNDARY_REGISTRY[boundaryId]
		const permissions =
			'permission' in registered
				? [registered.permission]
				: [...registered.permissions]
		for (const permission of permissions) {
			const definition = LABOS_PERMISSION_DEFINITION_REGISTRY.get(
				permission as LabOSPermission,
			)
			if (!definition) {
				throw new Error(
					`Non-action boundary ${boundaryId} uses an unknown permission`,
				)
			}
			if (boundaryId === 'N-001' && definition.scope !== 'organization') {
				throw new Error(
					`Non-action boundary ${boundaryId} must use an Organization-scoped permission`,
				)
			}
			if (
				(boundaryId === 'N-002' || boundaryId === 'N-API-002') &&
				definition.scope !== 'resource'
			) {
				throw new Error(
					`Non-action boundary ${boundaryId} must use resource-scoped permissions`,
				)
			}
		}
	}
}

assertRegisteredNonActionBoundariesUseTrustedDefinitions()

/** Returns immutable, server-owned metadata; callers cannot select a rule. */
export function getLabOSNonActionBoundaryMetadata(
	boundaryId: 'N-001',
): N001TeamDirectoryBoundaryMetadata
export function getLabOSNonActionBoundaryMetadata(
	boundaryId: 'N-002',
): N002PaystubBoundaryMetadata
export function getLabOSNonActionBoundaryMetadata(
	boundaryId: 'N-API-002',
): NApi002DentistDetailBoundaryMetadata
export function getLabOSNonActionBoundaryMetadata(
	boundaryId: LabOSNonActionBoundaryId,
): LabOSNonActionBoundaryMetadata
export function getLabOSNonActionBoundaryMetadata(
	boundaryId: LabOSNonActionBoundaryId,
): LabOSNonActionBoundaryMetadata {
	const definition = (
		LABOS_NON_ACTION_BOUNDARY_REGISTRY as unknown as Partial<
			Record<string, Omit<LabOSNonActionBoundaryMetadata, 'boundaryId'>>
		>
	)[boundaryId]

	if (!definition) throw new LabOSNonActionBoundaryError()

	return Object.freeze({
		boundaryId,
		...definition,
	}) as LabOSNonActionBoundaryMetadata
}

/** Projects only validated route identifiers into the fixed N-002 resource request. */
export function projectN002PaystubBoundary(
	input: z.infer<typeof N002PaystubInputSchema>,
): N002PaystubBoundaryProjection {
	const parsed = N002PaystubInputSchema.safeParse(input)
	if (!parsed.success) {
		throw new LabOSNonActionBoundaryError(
			LABOS_NON_ACTION_BOUNDARY_ERROR_CODES.VALIDATED_INPUT_INVALID,
		)
	}
	return Object.freeze({
		boundaryId: 'N-002',
		boundaryName: 'Staff-Payout-Paystub',
		target: Object.freeze({ type: 'payout', id: parsed.data.payoutId }),
		operation: Object.freeze({
			kind: 'payout.paystub.read',
			routeStaffId: parsed.data.staffId,
		}),
	})
}

/** Projects only validated route identifiers into the fixed Dentist read. */
export function projectNApi002DentistDetailBoundary(
	input: z.infer<typeof NApi002DentistDetailInputSchema>,
): NApi002DentistDetailBoundaryProjection {
	const parsed = NApi002DentistDetailInputSchema.safeParse(input)
	if (!parsed.success) {
		throw new LabOSNonActionBoundaryError(
			LABOS_NON_ACTION_BOUNDARY_ERROR_CODES.VALIDATED_INPUT_INVALID,
		)
	}

	return Object.freeze({
		boundaryId: 'N-API-002',
		boundaryName: 'Dentist-Detail-API',
		permission: 'dentist.read',
		target: Object.freeze({ type: 'dentist', id: parsed.data.dentistId }),
		operation: Object.freeze({
			kind: 'dentist.detail.read',
			routeClinicId: parsed.data.clinicId,
		}),
	})
}
