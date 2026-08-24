import 'server-only'

import { LABOS_PERMISSION_DEFINITION_REGISTRY } from './permission-definitions'
import type { LabOSPermission } from './permissions'

/**
 * Stable IDs for protected server boundaries that are not part of the legacy
 * safe-action inventory. The N-prefix keeps these records distinct from the
 * mechanically generated A-xxx action IDs.
 */
export const LABOS_NON_ACTION_BOUNDARY_IDS = Object.freeze(['N-001'] as const)

export type LabOSNonActionBoundaryId =
	(typeof LABOS_NON_ACTION_BOUNDARY_IDS)[number]

export const LABOS_NON_ACTION_BOUNDARY_ERROR_CODES = {
	BOUNDARY_NOT_REGISTERED: 'AUTHZ_NON_ACTION_BOUNDARY_NOT_REGISTERED',
} as const

export class LabOSNonActionBoundaryError extends Error {
	constructor(
		readonly code =
			LABOS_NON_ACTION_BOUNDARY_ERROR_CODES.BOUNDARY_NOT_REGISTERED,
	) {
		super('Authorization boundary is not registered')
		this.name = 'LabOSNonActionBoundaryError'
	}
}

export type LabOSNonActionBoundaryMetadata = Readonly<{
	boundaryId: LabOSNonActionBoundaryId
	kind: 'server-page'
	boundaryName: 'Team-And-Roles-Directory'
	route: '/settings/team'
	source: 'app/(main)/settings/team/page.tsx'
	permission: 'membership.list'
	legacyAccess: 'verified-tenant-member'
	wave: 'membership'
}>

type LabOSNonActionBoundaryDefinition = Omit<
	LabOSNonActionBoundaryMetadata,
	'boundaryId'
>

type LabOSNonActionBoundaryRegistry = Readonly<{
	[Id in LabOSNonActionBoundaryId]: LabOSNonActionBoundaryDefinition
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
} as const satisfies LabOSNonActionBoundaryRegistry)

/**
 * Verifies that registry permissions come from the authoritative catalog and
 * that collection/page boundaries do not silently become resource-scoped.
 * Activation in the concrete service is deliberately deferred to step 2.
 */
function assertRegisteredNonActionBoundariesUseTrustedDefinitions(): void {
	for (const boundaryId of LABOS_NON_ACTION_BOUNDARY_IDS) {
		const permission = LABOS_NON_ACTION_BOUNDARY_REGISTRY[boundaryId]
			.permission as LabOSPermission
		const definition = LABOS_PERMISSION_DEFINITION_REGISTRY.get(permission)

		if (!definition) {
			throw new Error(
				`Non-action boundary ${boundaryId} uses an unknown permission`,
			)
		}
		if (definition.scope !== 'organization') {
			throw new Error(
				`Non-action boundary ${boundaryId} must use an Organization-scoped permission`,
			)
		}
	}
}

assertRegisteredNonActionBoundariesUseTrustedDefinitions()

/** Returns immutable, server-owned metadata; callers cannot select a rule. */
export function getLabOSNonActionBoundaryMetadata(
	boundaryId: LabOSNonActionBoundaryId,
): LabOSNonActionBoundaryMetadata {
	const definition = (
		LABOS_NON_ACTION_BOUNDARY_REGISTRY as unknown as Partial<
			Record<string, LabOSNonActionBoundaryDefinition>
		>
	)[boundaryId]

	if (!definition) throw new LabOSNonActionBoundaryError()

	return Object.freeze({
		boundaryId,
		...definition,
	}) as LabOSNonActionBoundaryMetadata
}
