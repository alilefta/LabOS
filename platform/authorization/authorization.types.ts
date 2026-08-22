/**
 * Stable reasons used for internal authorization telemetry and tests. Public
 * callers receive only the generic AuthorizationError message.
 */
export const AUTHORIZATION_DENIAL_REASONS = {
	ACTOR_INVALID: 'AUTHZ_ACTOR_INVALID',
	ROLE_UNRECOGNIZED: 'AUTHZ_ROLE_UNRECOGNIZED',
	PERMISSION_NOT_GRANTED: 'AUTHZ_PERMISSION_NOT_GRANTED',
	PERMISSION_DEFINITION_MISSING: 'AUTHZ_PERMISSION_DEFINITION_MISSING',
	RESOURCE_REQUIRED: 'AUTHZ_RESOURCE_REQUIRED',
	RESOURCE_UNEXPECTED: 'AUTHZ_RESOURCE_UNEXPECTED',
	TARGET_TYPE_MISMATCH: 'AUTHZ_TARGET_TYPE_MISMATCH',
	TARGET_RESOLVER_MISSING: 'AUTHZ_TARGET_RESOLVER_MISSING',
	TARGET_NOT_FOUND: 'AUTHZ_TARGET_NOT_FOUND',
	TARGET_RESOLUTION_FAILED: 'AUTHZ_TARGET_RESOLUTION_FAILED',
	TENANT_MISMATCH: 'AUTHZ_TENANT_MISMATCH',
	POLICY_NOT_REGISTERED: 'AUTHZ_POLICY_NOT_REGISTERED',
	POLICY_DENIED: 'AUTHZ_POLICY_DENIED',
	POLICY_FACT_MISSING: 'AUTHZ_POLICY_FACT_MISSING',
	POLICY_FAILED: 'AUTHZ_POLICY_FAILED',
	OWNER_INVARIANT: 'AUTHZ_OWNER_INVARIANT',
} as const

export type AuthorizationDenialReason =
	(typeof AUTHORIZATION_DENIAL_REASONS)[keyof typeof AUTHORIZATION_DENIAL_REASONS]

export type AuthorizationActor = {
	userId: string
	memberId: string
	organizationId: string
	/** Raw, authoritative Organization membership roles. */
	memberRoles: readonly string[]
}

export type AuthorizationTargetRef<ResourceType extends string> = {
	type: ResourceType
	id: string
}

export type AuthorizationRequest<
	Permission extends string,
	ResourceType extends string,
> = {
	actor: AuthorizationActor
	permission: Permission
	target?: AuthorizationTargetRef<ResourceType>
	correlationId?: string
}

export type PermissionSensitivity = 'ordinary' | 'sensitive' | 'critical'

type PermissionDefinitionBase<
	Permission extends string,
	PolicyId extends string,
> = {
	permission: Permission
	requiredPolicies: readonly PolicyId[]
	sensitivity: PermissionSensitivity
}

export type OrganizationPermissionDefinition<
	Permission extends string,
	PolicyId extends string,
> = PermissionDefinitionBase<Permission, PolicyId> & {
	scope: 'organization'
}

export type ResourcePermissionDefinition<
	Permission extends string,
	ResourceType extends string,
	PolicyId extends string,
> = PermissionDefinitionBase<Permission, PolicyId> & {
	scope: 'resource'
	targetType: ResourceType
}

export type PermissionDefinition<
	Permission extends string,
	ResourceType extends string,
	PolicyId extends string,
> =
	| OrganizationPermissionDefinition<Permission, PolicyId>
	| ResourcePermissionDefinition<Permission, ResourceType, PolicyId>

export type AuthorizationDecision =
	| { allowed: true; reason: 'ROLE_PERMISSION' | 'POLICY_ALLOWED' }
	| { allowed: false; reason: AuthorizationDenialReason }

export type AuthorizationPolicyDenialReason = Extract<
	AuthorizationDenialReason,
	| 'AUTHZ_POLICY_DENIED'
	| 'AUTHZ_POLICY_FACT_MISSING'
	| 'AUTHZ_OWNER_INVARIANT'
>

export type AuthorizationPolicyResult =
	| { allowed: true }
	| { allowed: false; reason?: AuthorizationPolicyDenialReason }

export type AuthorizationPolicyContext<
	Permission extends string,
	ResourceType extends string,
> = {
	actor: AuthorizationActor
	permission: Permission
	target?: AuthorizationTargetRef<ResourceType>
}

export interface AuthorizationPolicy<
	Permission extends string,
	ResourceType extends string,
> {
	evaluate(
		context: AuthorizationPolicyContext<Permission, ResourceType>,
	): Promise<AuthorizationPolicyResult> | AuthorizationPolicyResult
}

export interface AuthorizationTargetResolver<ResourceType extends string> {
	resolveOrganizationId(input: {
		actor: AuthorizationActor
		target: AuthorizationTargetRef<ResourceType>
	}): Promise<string | null> | string | null
}

export interface AuthorizationService<
	Permission extends string,
	ResourceType extends string,
> {
	can(
		request: AuthorizationRequest<Permission, ResourceType>,
	): Promise<AuthorizationDecision>
	require(
		request: AuthorizationRequest<Permission, ResourceType>,
	): Promise<void>
	roleCapabilities<RequestedPermission extends Permission>(
		actor: AuthorizationActor,
		permissions: readonly RequestedPermission[],
	): Promise<Readonly<Record<RequestedPermission, boolean>>>
}
