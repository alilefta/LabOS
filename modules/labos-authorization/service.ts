import 'server-only'

import {
	consoleAuthorizationMonitor,
	createAuthorizationService,
	createPermissionDefinitionRegistry,
} from '@/platform/authorization'
import type {
	AuthorizationMonitor,
	AuthorizationPolicy,
	AuthorizationService,
	AuthorizationTargetResolver,
	PermissionDefinition,
} from '@/platform/authorization'

import {
	LABOS_MEMBERSHIP_ACCESS_POLICIES,
	LABOS_MEMBERSHIP_TARGET_RESOLVERS,
} from './membership-access.adapters'
import type { LabOSAuthorizationOperationMap } from './operation-intents'
import {
	LABOS_PERMISSION_DEFINITION_REGISTRY,
} from './permission-definitions'
import type { LabOSPermission } from './permissions'
import type { LabOSPolicyId } from './policy-ids'
import type { LabOSResourceType } from './resource-types'
import {
	LABOS_ORGANIZATION_ROLES,
	LABOS_ROLE_PERMISSION_BUNDLES,
	type LabOSOrganizationRole,
} from './roles'

/**
 * Permissions whose complete resolver/policy path is currently implemented.
 * New entries must come from the authoritative catalog and bring their target,
 * policy, monitoring, and isolation tests in the same change.
 */
export const LABOS_AUTHORIZATION_V1_SUPPORTED_PERMISSIONS = Object.freeze([
	'staff.create',
	'staff.access.invite',
	'staff.access.revoke',
	'membership.list',
	'membership.read',
	'membership.invite',
	'membership.role.update',
	'membership.remove',
] as const satisfies readonly LabOSPermission[])

type LabOSPermissionDefinition = PermissionDefinition<
	LabOSPermission,
	LabOSResourceType,
	LabOSPolicyId
>

function resolveSupportedPermissionDefinitions(): readonly LabOSPermissionDefinition[] {
	return Object.freeze(
		LABOS_AUTHORIZATION_V1_SUPPORTED_PERMISSIONS.map((permission) => {
			const definition = LABOS_PERMISSION_DEFINITION_REGISTRY.get(permission)
			if (!definition) {
				throw new Error(
					`Supported LabOS permission is missing from the catalog: ${permission}`,
				)
			}
			return definition
		}),
	)
}

/**
 * A filtered view of the full trusted catalog. Unsupported permissions are
 * intentionally absent, causing the generic kernel to deny them rather than
 * treating their role bundle as sufficient for unfinished behavior.
 */
export const LABOS_AUTHORIZATION_V1_PERMISSION_DEFINITIONS =
	resolveSupportedPermissionDefinitions()

export const LABOS_AUTHORIZATION_V1_PERMISSION_REGISTRY =
	createPermissionDefinitionRegistry(
		LABOS_AUTHORIZATION_V1_PERMISSION_DEFINITIONS,
	)

export type LabOSAuthorizationService = AuthorizationService<
	LabOSPermission,
	LabOSResourceType,
	LabOSAuthorizationOperationMap
>

type LabOSAuthorizationPolicy = AuthorizationPolicy<
	LabOSPermission,
	LabOSResourceType,
	LabOSAuthorizationOperationMap
>

export type LabOSAuthorizationServiceOptions = {
	targetResolvers?: Readonly<
		Partial<
			Record<
				LabOSResourceType,
				AuthorizationTargetResolver<LabOSResourceType>
			>
		>
	>
	policies?: Readonly<Partial<Record<LabOSPolicyId, LabOSAuthorizationPolicy>>>
	monitor?: AuthorizationMonitor<
		LabOSPermission,
		LabOSOrganizationRole,
		LabOSResourceType
	>
	now?: () => number
}

/** Sanitized default monitor supplied by the generic platform kernel. */
export const labosAuthorizationMonitor: AuthorizationMonitor<
	LabOSPermission,
	LabOSOrganizationRole,
	LabOSResourceType
> = {
	record(event) {
		consoleAuthorizationMonitor.record(event)
	},
}

/**
 * Composes the concrete, server-only LabOS Authorization V1 service.
 *
 * The factory supports dependency injection for deterministic tests. Runtime
 * defaults register only the Staff/Member resolvers and membership/Staff-
 * access policies implemented so far. The service is stateless; request facts
 * remain isolated inside the generic evaluator's per-decision cache.
 */
export function createLabOSAuthorizationService(
	options: LabOSAuthorizationServiceOptions = {},
): LabOSAuthorizationService {
	return createAuthorizationService<
		LabOSPermission,
		LabOSOrganizationRole,
		LabOSResourceType,
		LabOSPolicyId,
		LabOSAuthorizationOperationMap
	>({
		knownRoles: LABOS_ORGANIZATION_ROLES,
		roleBundles: LABOS_ROLE_PERMISSION_BUNDLES,
		permissionDefinitions: LABOS_AUTHORIZATION_V1_PERMISSION_REGISTRY,
		targetResolvers:
			options.targetResolvers ?? LABOS_MEMBERSHIP_TARGET_RESOLVERS,
		policies: options.policies ?? LABOS_MEMBERSHIP_ACCESS_POLICIES,
		monitor: options.monitor ?? labosAuthorizationMonitor,
		now: options.now,
	})
}

/**
 * Shared runtime instance. It is not consumed by actions until the explicit
 * shadow safe-action integration step.
 */
export const labosAuthorizationService = createLabOSAuthorizationService()
