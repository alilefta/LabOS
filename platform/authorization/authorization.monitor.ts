import type {
	AuthorizationDecision,
	PermissionSensitivity,
} from './authorization.types'

export type AuthorizationMonitorEvent<
	Permission extends string,
	Role extends string,
	ResourceType extends string,
> = {
	event: 'platform.authorization.decision'
	permission: Permission
	sensitivity?: PermissionSensitivity
	organizationId?: string
	roles: readonly Role[]
	unknownRoleCount: number
	targetType?: ResourceType
	correlationId?: string
	outcome: 'allowed' | 'denied'
	severity: 'info' | 'warning' | 'high'
	reason: AuthorizationDecision['reason']
	durationMs: number
}

export interface AuthorizationMonitor<
	Permission extends string,
	Role extends string,
	ResourceType extends string,
> {
	record(event: AuthorizationMonitorEvent<Permission, Role, ResourceType>): void
}

export const noopAuthorizationMonitor: AuthorizationMonitor<
	string,
	string,
	string
> = {
	record() {},
}

/**
 * Emits allowlisted authorization telemetry. Target IDs, resource payloads,
 * user input, provider errors, credentials, and sensitive domain data are
 * intentionally absent from the event contract.
 */
export const consoleAuthorizationMonitor: AuthorizationMonitor<
	string,
	string,
	string
> = {
	record(event) {
		const writer =
			event.severity === 'high'
				? console.error
				: event.outcome === 'denied'
					? console.warn
					: console.info
		writer(event)
	},
}
