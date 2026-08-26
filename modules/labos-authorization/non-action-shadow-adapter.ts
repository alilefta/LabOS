import 'server-only'

import { normalizeRoles } from '@/platform/authorization'

import {
	createLabOSAuthorizationActor,
	type LabOSAuthorizationActorSource,
} from './actor'
import { getLabOSNonActionBoundaryMetadata } from './non-action-boundaries'
import { LABOS_ORGANIZATION_ROLES } from './roles'
import {
	classifyLabOSShadowComparison,
	LABOS_SHADOW_ERROR_CODES,
	LabOSShadowLegacyEvaluationError,
	type LabOSShadowEvaluationOptions,
	type LabOSShadowEvaluationResult,
	type ShadowV1Decision,
} from './shadow-evaluation'
import { labosAuthorizationService } from './service'
import { structuredLabOSShadowMonitor } from './shadow-telemetry'

export type N001TeamDirectoryShadowInput = Readonly<{
	tenant: LabOSAuthorizationActorSource
	/**
	 * Injectable representation of the existing page gate. Runtime callers
	 * omit it because a canonical TenantContext proves verified membership.
	 */
	evaluateLegacy?: () => boolean | Promise<boolean>
}>

/**
 * Evaluates the Team & Roles server-page boundary in observational mode.
 *
 * The existing verified-tenant-member behavior remains authoritative. V1
 * evaluates `membership.list` from the same canonical tenant context and is
 * compared for rollout evidence. No repository is called here, and V1 denial
 * or failure cannot block a request allowed by the legacy page boundary.
 */
export async function evaluateN001TeamDirectoryAuthorizationShadow(
	input: N001TeamDirectoryShadowInput,
	options: LabOSShadowEvaluationOptions = {},
): Promise<LabOSShadowEvaluationResult> {
	const metadata = getLabOSNonActionBoundaryMetadata('N-001')
	const actor = createLabOSAuthorizationActor(input.tenant)
	const service = options.authorizationService ?? labosAuthorizationService
	const monitor = options.monitor ?? structuredLabOSShadowMonitor
	const now = options.now ?? (() => performance.now())
	const correlationId = (
		options.generateCorrelationId ?? (() => crypto.randomUUID())
	)()
	const startedAt = now()
	const normalizedRoles = normalizeRoles(
		actor.memberRoles,
		LABOS_ORGANIZATION_ROLES,
	)

	const [legacyResult, v1Result] = await Promise.allSettled([
		Promise.resolve().then(input.evaluateLegacy ?? (() => true)),
		Promise.resolve().then(() =>
			service.can({
				actor,
				permission: metadata.permission,
				correlationId,
			}),
		),
	])

	const v1Decision: ShadowV1Decision =
		v1Result.status === 'fulfilled'
			? Object.freeze({
					status: 'completed',
					allowed: v1Result.value.allowed,
					reason: v1Result.value.reason,
				})
			: Object.freeze({
					status: 'failed',
					allowed: false,
					reason: LABOS_SHADOW_ERROR_CODES.V1_EVALUATION_FAILED,
				})

	if (legacyResult.status === 'rejected') {
		try {
			monitor.record({
				event: 'labos.authorization.shadow_comparison',
				boundaryId: metadata.boundaryId,
				actionName: metadata.boundaryName,
				permission: metadata.permission,
				organizationId: actor.organizationId,
				actorRoles: normalizedRoles.roles,
				unknownRoleCount: normalizedRoles.unknownRoleCount,
				legacyRequiredRole: null,
				correlationId,
				legacyOutcome: 'failed',
				v1Outcome:
					v1Decision.status === 'failed'
						? 'failed'
						: v1Decision.allowed
							? 'allowed'
							: 'denied',
				v1Reason: v1Decision.reason,
				enforcementSource: 'legacy',
				severity: 'high',
				reviewPriority: 'review',
				durationMs: Math.max(0, now() - startedAt),
			})
		} catch {
			// Monitoring cannot replace the fail-closed legacy result.
		}
		throw new LabOSShadowLegacyEvaluationError()
	}

	const legacyAllowed = legacyResult.value === true
	const comparison = classifyLabOSShadowComparison(
		legacyAllowed,
		v1Decision.allowed,
	)
	const result: LabOSShadowEvaluationResult = Object.freeze({
		boundaryId: metadata.boundaryId,
		correlationId,
		comparison,
		legacyDecision: Object.freeze({ allowed: legacyAllowed }),
		v1Decision,
		enforcement: Object.freeze({
			source: 'legacy' as const,
			allowed: legacyAllowed,
		}),
	})

	try {
		monitor.record({
			event: 'labos.authorization.shadow_comparison',
			boundaryId: metadata.boundaryId,
			actionName: metadata.boundaryName,
			permission: metadata.permission,
			organizationId: actor.organizationId,
			actorRoles: normalizedRoles.roles,
			unknownRoleCount: normalizedRoles.unknownRoleCount,
			legacyRequiredRole: null,
			correlationId,
			legacyOutcome: legacyAllowed ? 'allowed' : 'denied',
			v1Outcome:
				v1Decision.status === 'failed'
					? 'failed'
					: v1Decision.allowed
						? 'allowed'
						: 'denied',
			v1Reason: v1Decision.reason,
			comparison,
			enforcementSource: 'legacy',
			severity:
				v1Decision.status === 'failed' ||
				comparison === 'LEGACY_DENY_V1_ALLOW'
					? 'high'
					: comparison === 'MATCH_ALLOW' || comparison === 'MATCH_DENY'
						? 'info'
						: 'warning',
			reviewPriority:
				comparison === 'LEGACY_DENY_V1_ALLOW'
					? 'highest'
					: v1Decision.status === 'failed' ||
							comparison === 'LEGACY_ALLOW_V1_DENY'
						? 'review'
						: 'routine',
			durationMs: Math.max(0, now() - startedAt),
		})
	} catch {
		// Observability must never alter the legacy page decision.
	}

	return result
}
