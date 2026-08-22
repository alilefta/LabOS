import { AuthorizationError } from './authorization.error'
import type { AuthorizationMonitor } from './authorization.monitor'
import { noopAuthorizationMonitor } from './authorization.monitor'
import type {
	AuthorizationDecision,
	AuthorizationPolicy,
	AuthorizationPolicyResult,
	AuthorizationRequest,
	AuthorizationService,
	AuthorizationTargetResolver,
} from './authorization.types'
import { AUTHORIZATION_DENIAL_REASONS } from './authorization.types'
import type { PermissionDefinitionRegistry } from './permissions'
import {
	normalizeRoles,
	resolveRolePermissions,
	type RolePermissionBundles,
} from './roles'

export type AuthorizationServiceConfiguration<
	Permission extends string,
	Role extends string,
	ResourceType extends string,
	PolicyId extends string,
> = {
	knownRoles: readonly Role[]
	roleBundles: RolePermissionBundles<Role, Permission>
	permissionDefinitions: PermissionDefinitionRegistry<
		Permission,
		ResourceType,
		PolicyId
	>
	targetResolvers?: Readonly<
		Partial<Record<ResourceType, AuthorizationTargetResolver<ResourceType>>>
	>
	policies?: Readonly<
		Partial<
			Record<PolicyId, AuthorizationPolicy<Permission, ResourceType>>
		>
	>
	monitor?: AuthorizationMonitor<Permission, Role, ResourceType>
	now?: () => number
}

function hasValidActorIdentifiers(actor: unknown): actor is AuthorizationRequest<
	string,
	string
>['actor'] {
	return (
		typeof actor === 'object' &&
		actor !== null &&
		'userId' in actor &&
		typeof actor.userId === 'string' &&
		Boolean(actor.userId.trim()) &&
		'memberId' in actor &&
		typeof actor.memberId === 'string' &&
		Boolean(actor.memberId.trim()) &&
		'organizationId' in actor &&
		typeof actor.organizationId === 'string' &&
		Boolean(actor.organizationId.trim()) &&
		'memberRoles' in actor &&
		Array.isArray(actor.memberRoles)
	)
}

const HIGH_SEVERITY_REASONS = new Set<AuthorizationDecision['reason']>([
	AUTHORIZATION_DENIAL_REASONS.PERMISSION_DEFINITION_MISSING,
	AUTHORIZATION_DENIAL_REASONS.TARGET_RESOLVER_MISSING,
	AUTHORIZATION_DENIAL_REASONS.TARGET_RESOLUTION_FAILED,
	AUTHORIZATION_DENIAL_REASONS.POLICY_NOT_REGISTERED,
	AUTHORIZATION_DENIAL_REASONS.POLICY_FAILED,
])

/**
 * Creates a default-deny authorization evaluator. Configuration is captured
 * once; callers can supply only actor, permission, and an identifier-only
 * target, never trusted permission metadata or policy facts.
 */
export function createAuthorizationService<
	Permission extends string,
	Role extends string,
	ResourceType extends string,
	PolicyId extends string,
>(
	configuration: AuthorizationServiceConfiguration<
		Permission,
		Role,
		ResourceType,
		PolicyId
	>,
): AuthorizationService<Permission, ResourceType> {
	const knownRoles = Object.freeze([...configuration.knownRoles])
	const targetResolvers = new Map<
		ResourceType,
		AuthorizationTargetResolver<ResourceType>
	>(
		Object.entries(configuration.targetResolvers ?? {}) as [
			ResourceType,
			AuthorizationTargetResolver<ResourceType>,
		][],
	)
	const policies = new Map<
		PolicyId,
		AuthorizationPolicy<Permission, ResourceType>
	>(
		Object.entries(configuration.policies ?? {}) as [
			PolicyId,
			AuthorizationPolicy<Permission, ResourceType>,
		][],
	)
	const monitor =
		configuration.monitor ??
		(noopAuthorizationMonitor as AuthorizationMonitor<
			Permission,
			Role,
			ResourceType
		>)
	const now = configuration.now ?? (() => performance.now())

	async function can(
		request: AuthorizationRequest<Permission, ResourceType>,
	): Promise<AuthorizationDecision> {
		const startedAt = now()
		const actorIsValid = hasValidActorIdentifiers(request.actor)
		const normalized = actorIsValid
			? normalizeRoles(request.actor.memberRoles, knownRoles)
			: { roles: [] as readonly Role[], unknownRoleCount: 0 }
		const finish = (decision: AuthorizationDecision) => {
			try {
				monitor.record({
					event: 'platform.authorization.decision',
					permission: request.permission,
					sensitivity:
						configuration.permissionDefinitions.get(request.permission)
							?.sensitivity,
					organizationId: hasValidActorIdentifiers(request.actor)
						? request.actor.organizationId
						: undefined,
					roles: normalized.roles,
					unknownRoleCount: normalized.unknownRoleCount,
					targetType: request.target?.type,
					correlationId: request.correlationId,
					outcome: decision.allowed ? 'allowed' : 'denied',
					severity: decision.allowed
						? 'info'
						: HIGH_SEVERITY_REASONS.has(decision.reason)
							? 'high'
							: 'warning',
					reason: decision.reason,
					durationMs: Math.max(0, now() - startedAt),
				})
			} catch {
				// Observability must never change an authorization decision.
			}
			return decision
		}

		const deny = (
			reason: Exclude<AuthorizationDecision, { allowed: true }>['reason'],
		) => finish({ allowed: false, reason })

		if (!actorIsValid) {
			return deny(AUTHORIZATION_DENIAL_REASONS.ACTOR_INVALID)
		}

		if (normalized.roles.length === 0) {
			return deny(AUTHORIZATION_DENIAL_REASONS.ROLE_UNRECOGNIZED)
		}

		const grantedPermissions = resolveRolePermissions(
			normalized.roles,
			configuration.roleBundles,
		)
		if (!grantedPermissions.has(request.permission)) {
			return deny(AUTHORIZATION_DENIAL_REASONS.PERMISSION_NOT_GRANTED)
		}

		const definition = configuration.permissionDefinitions.get(
			request.permission,
		)
		if (!definition) {
			return deny(
				AUTHORIZATION_DENIAL_REASONS.PERMISSION_DEFINITION_MISSING,
			)
		}
		if (definition.scope === 'organization') {
			if (request.target) {
				return deny(AUTHORIZATION_DENIAL_REASONS.RESOURCE_UNEXPECTED)
			}
		} else {
			if (
				!request.target ||
				typeof request.target.id !== 'string' ||
				!request.target.id.trim()
			) {
				return deny(AUTHORIZATION_DENIAL_REASONS.RESOURCE_REQUIRED)
			}
			if (request.target.type !== definition.targetType) {
				return deny(AUTHORIZATION_DENIAL_REASONS.TARGET_TYPE_MISMATCH)
			}

			const resolver = targetResolvers.get(definition.targetType)
			if (!resolver) {
				return deny(AUTHORIZATION_DENIAL_REASONS.TARGET_RESOLVER_MISSING)
			}

			let targetOrganizationId: string | null
			try {
				targetOrganizationId = await resolver.resolveOrganizationId({
					actor: request.actor,
					target: request.target,
				})
			} catch {
				return deny(AUTHORIZATION_DENIAL_REASONS.TARGET_RESOLUTION_FAILED)
			}

			if (!targetOrganizationId) {
				return deny(AUTHORIZATION_DENIAL_REASONS.TARGET_NOT_FOUND)
			}
			if (targetOrganizationId !== request.actor.organizationId) {
				return deny(AUTHORIZATION_DENIAL_REASONS.TENANT_MISMATCH)
			}
		}

		for (const policyId of definition.requiredPolicies) {
			if (!policies.has(policyId)) {
				return deny(AUTHORIZATION_DENIAL_REASONS.POLICY_NOT_REGISTERED)
			}
		}

		for (const policyId of definition.requiredPolicies) {
			let policyResult: AuthorizationPolicyResult
			try {
				policyResult = await policies.get(policyId)!.evaluate({
					actor: request.actor,
					permission: request.permission,
					target: request.target,
				})
			} catch {
				return deny(AUTHORIZATION_DENIAL_REASONS.POLICY_FAILED)
			}

			if (!policyResult.allowed) {
				return deny(
					policyResult.reason ?? AUTHORIZATION_DENIAL_REASONS.POLICY_DENIED,
				)
			}
		}

		return finish({
			allowed: true,
			reason:
				definition.scope === 'resource' ||
				definition.requiredPolicies.length > 0
					? 'POLICY_ALLOWED'
					: 'ROLE_PERMISSION',
		})
	}

	return {
		can,
		async require(request) {
			const decision = await can(request)
			if (!decision.allowed) {
				throw new AuthorizationError(decision.reason)
			}
		},
		async roleCapabilities(actor, permissions) {
			const normalized = hasValidActorIdentifiers(actor)
				? normalizeRoles(actor.memberRoles, knownRoles)
				: { roles: [], unknownRoleCount: 0 }
			const grantedPermissions = resolveRolePermissions(
				normalized.roles,
				configuration.roleBundles,
			)

			return Object.freeze(
				Object.fromEntries(
					permissions.map((permission) => [
						permission,
						grantedPermissions.has(permission),
					]),
				) as Record<(typeof permissions)[number], boolean>,
			)
		},
	}
}
