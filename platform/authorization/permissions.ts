import type { PermissionDefinition } from './authorization.types'

export interface PermissionDefinitionRegistry<
	Permission extends string,
	ResourceType extends string,
	PolicyId extends string,
> {
	get(
		permission: Permission,
	): PermissionDefinition<Permission, ResourceType, PolicyId> | undefined
	has(permission: Permission): boolean
	list(): readonly PermissionDefinition<Permission, ResourceType, PolicyId>[]
}

/**
 * Creates a trusted, immutable snapshot of permission enforcement metadata.
 * Invalid or duplicate definitions fail during service construction.
 */
export function createPermissionDefinitionRegistry<
	Permission extends string,
	ResourceType extends string,
	PolicyId extends string,
>(
	definitions: readonly PermissionDefinition<
		Permission,
		ResourceType,
		PolicyId
	>[],
): PermissionDefinitionRegistry<Permission, ResourceType, PolicyId> {
	const byPermission = new Map<
		Permission,
		PermissionDefinition<Permission, ResourceType, PolicyId>
	>()

	for (const definition of definitions) {
		if (
			!definition.permission.match(
				/^[a-z][a-z0-9_-]*(\.[a-z][a-z0-9_-]*)+$/,
			)
		) {
			throw new Error(
				`Authorization permissions must use lowercase resource.action names: ${definition.permission}`,
			)
		}
		if (byPermission.has(definition.permission)) {
			throw new Error(
				`Duplicate authorization permission definition: ${definition.permission}`,
			)
		}
		if (definition.scope === 'resource' && !definition.targetType.trim()) {
			throw new Error(
				`Resource permission ${definition.permission} requires a target type`,
			)
		}

		const uniquePolicies = new Set(definition.requiredPolicies)
		if (uniquePolicies.size !== definition.requiredPolicies.length) {
			throw new Error(
				`Permission ${definition.permission} contains duplicate required policies`,
			)
		}
		if (definition.requiredPolicies.some((policyId) => !policyId.trim())) {
			throw new Error(
				`Permission ${definition.permission} contains an empty required policy`,
			)
		}

		const snapshot = Object.freeze({
			...definition,
			requiredPolicies: Object.freeze([...definition.requiredPolicies]),
		}) as PermissionDefinition<Permission, ResourceType, PolicyId>
		byPermission.set(definition.permission, snapshot)
	}

	return Object.freeze({
		get: (permission: Permission) => byPermission.get(permission),
		has: (permission: Permission) => byPermission.has(permission),
		list: () => Object.freeze([...byPermission.values()]),
	})
}
