export { AuthorizationError } from './authorization.error'
export { createAuthorizationFactCache } from './authorization.fact-cache'
export type { AuthorizationFactCache } from './authorization.fact-cache'
export {
	consoleAuthorizationMonitor,
	noopAuthorizationMonitor,
} from './authorization.monitor'
export type {
	AuthorizationMonitor,
	AuthorizationMonitorEvent,
} from './authorization.monitor'
export { createAuthorizationService } from './authorization.service'
export type { AuthorizationServiceConfiguration } from './authorization.service'
export {
	AUTHORIZATION_DENIAL_REASONS,
} from './authorization.types'
export type {
	AuthorizationActor,
	AuthorizationDecision,
	AuthorizationDenialReason,
	AuthorizationOperationMap,
	AuthorizationPolicy,
	AuthorizationPolicyContext,
	AuthorizationPolicyResult,
	AuthorizationRequest,
	AuthorizationService,
	AuthorizationTargetRef,
	AuthorizationTargetResolver,
	OrganizationPermissionDefinition,
	PermissionDefinition,
	PermissionSensitivity,
	ResourcePermissionDefinition,
} from './authorization.types'
export { createPermissionDefinitionRegistry } from './permissions'
export type { PermissionDefinitionRegistry } from './permissions'
export {
	createRolePermissionBundles,
	normalizeRoles,
	resolveRolePermissions,
} from './roles'
export type { NormalizedRoles, RolePermissionBundles } from './roles'
