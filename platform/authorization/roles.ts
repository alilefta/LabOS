export type NormalizedRoles<Role extends string> = {
	roles: readonly Role[]
	unknownRoleCount: number
}

export type RolePermissionBundles<
	Role extends string,
	Permission extends string,
> = {
	has(role: Role, permission: Permission): boolean
	permissionsFor(role: Role): readonly Permission[]
}

/**
 * Normalizes provider role strings without granting compatibility aliases.
 * Unknown roles are counted for monitoring and grant no permissions.
 */
export function normalizeRoles<Role extends string>(
	rawRoles: readonly string[],
	knownRoles: readonly Role[],
): NormalizedRoles<Role> {
	const knownRoleByValue = new Map<string, Role>(
		knownRoles.map((role) => [role.toLowerCase(), role]),
	)
	const roles = new Set<Role>()
	let unknownRoleCount = 0

	for (const rawRole of rawRoles) {
		if (typeof rawRole !== 'string') {
			unknownRoleCount += 1
			continue
		}

		const normalized = rawRole.trim().toLowerCase()
		const role = knownRoleByValue.get(normalized)
		if (!role) {
			unknownRoleCount += 1
			continue
		}
		roles.add(role)
	}

	return {
		roles: Object.freeze([...roles]),
		unknownRoleCount,
	}
}

/**
 * Copies and validates fixed role bundles at startup. Mutable Sets remain in
 * the closure and callers receive only query methods and frozen snapshots.
 */
export function createRolePermissionBundles<
	Role extends string,
	Permission extends string,
>(input: {
	roles: readonly Role[]
	permissions: readonly Permission[]
	bundles: Readonly<Record<Role, readonly Permission[]>>
}): RolePermissionBundles<Role, Permission> {
	if (new Set(input.roles).size !== input.roles.length) {
		throw new Error('Authorization roles must be unique')
	}
	if (new Set(input.permissions).size !== input.permissions.length) {
		throw new Error('Authorization permissions must be unique')
	}
	for (const role of input.roles) {
		if (!role.trim() || role !== role.trim().toLowerCase()) {
			throw new Error(
				`Authorization roles must be non-empty lowercase identifiers: ${role}`,
			)
		}
	}

	const knownPermissions = new Set(input.permissions)
	const bundles = new Map<Role, Set<Permission>>()

	for (const role of input.roles) {
		const configuredPermissions = input.bundles[role]
		if (!configuredPermissions) {
			throw new Error(`Missing authorization bundle for role: ${role}`)
		}

		const permissionSet = new Set<Permission>()
		for (const permission of configuredPermissions) {
			if (!knownPermissions.has(permission)) {
				throw new Error(
					`Unknown permission "${permission}" in authorization bundle for role: ${role}`,
				)
			}
			permissionSet.add(permission)
		}
		bundles.set(role, permissionSet)
	}
	const permissionSnapshots = new Map<Role, readonly Permission[]>(
		[...bundles].map(([role, permissions]) => [
			role,
			Object.freeze([...permissions]),
		]),
	)

	return Object.freeze({
		has: (role, permission) => bundles.get(role)?.has(permission) ?? false,
		permissionsFor: (role) => permissionSnapshots.get(role) ?? [],
	})
}

/** Resolves the union of explicit bundles; no role hierarchy is applied. */
export function resolveRolePermissions<
	Role extends string,
	Permission extends string,
>(
	roles: readonly Role[],
	bundles: RolePermissionBundles<Role, Permission>,
): ReadonlySet<Permission> {
	const permissions = new Set<Permission>()
	for (const role of roles) {
		for (const permission of bundles.permissionsFor(role)) {
			permissions.add(permission)
		}
	}
	return permissions
}
