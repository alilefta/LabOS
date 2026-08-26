import 'server-only'

import type { AuthorizationActor } from '@/platform/authorization'
import type { TenantContext } from '@/platform/organizations'

export type LabOSAuthorizationActorSource = Pick<
	TenantContext,
	'userId' | 'memberId' | 'organizationId' | 'memberRole'
>

/**
 * Converts the already-verified tenant context into the domain-independent
 * actor consumed by Authorization V1.
 *
 * Better Auth stores multiple Organization roles as a comma-delimited string.
 * Tokens are trimmed but deliberately not lower-cased, filtered, aliased, or
 * otherwise interpreted here. The generic kernel remains authoritative for
 * normalization, unknown-role telemetry, and default denial. In particular,
 * the legacy `member -> staff` compatibility mapping is never applied.
 *
 * This adapter performs no database or session lookup and never copies LabOS
 * facts such as `labId` or `staffId` into the generic actor boundary.
 */
export function createLabOSAuthorizationActor(
	tenant: LabOSAuthorizationActorSource,
): AuthorizationActor {
	const memberRoles = Object.freeze(
		typeof tenant.memberRole === 'string'
			? tenant.memberRole.split(',').map((role) => role.trim())
			: [],
	)

	return Object.freeze({
		userId: tenant.userId,
		memberId: tenant.memberId,
		organizationId: tenant.organizationId,
		memberRoles,
	})
}
