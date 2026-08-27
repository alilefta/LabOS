import 'server-only'

import { normalizeRoles } from '@/platform/authorization'

import {
	createLabOSAuthorizationActor,
	type LabOSAuthorizationActorSource,
} from './actor'
import { isLabOSAuthorizationV1Enforced } from './enforcement-mode'
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
 * Evaluates the Team & Roles server-page boundary with deployment-selected
 * enforcement.
 *
 * Shadow and rollback modes preserve the verified-tenant-member gate. V1 mode
 * makes `membership.list` authoritative and fails closed on a denial or an
 * evaluation failure. Both decisions are still recorded for rollout evidence.
 * No repository is called here.
 */
export async function evaluateN001TeamDirectoryAuthorization(
	input: N001TeamDirectoryShadowInput,
	options: LabOSShadowEvaluationOptions = {},
): Promise<LabOSShadowEvaluationResult> {
	const metadata = getLabOSNonActionBoundaryMetadata('N-001')
	const actor = createLabOSAuthorizationActor(input.tenant)
	const service = options.authorizationService ?? labosAuthorizationService
	const monitor = options.monitor ?? structuredLabOSShadowMonitor
	const now = options.now ?? (() => performance.now())
	const enforcementSource =
		options.enforcementSource ??
		(isLabOSAuthorizationV1Enforced() ? 'v1' : 'legacy')
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

	if (legacyResult.status === 'rejected' && enforcementSource === 'legacy') {
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
				enforcementSource,
				severity: 'high',
				reviewPriority: 'review',
				durationMs: Math.max(0, now() - startedAt),
			})
		} catch {
			// Monitoring cannot replace the fail-closed legacy result.
		}
		throw new LabOSShadowLegacyEvaluationError()
	}

	// Once V1 is authoritative, a legacy failure remains observational and is
	// represented as a denied legacy comparison instead of blocking V1.
	const legacyAllowed =
		legacyResult.status === 'fulfilled' && legacyResult.value === true
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
			source: enforcementSource,
			allowed: enforcementSource === 'v1' ? v1Decision.allowed : legacyAllowed,
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
			legacyOutcome:
				legacyResult.status === 'rejected'
					? 'failed'
					: legacyAllowed
						? 'allowed'
						: 'denied',
			v1Outcome:
				v1Decision.status === 'failed'
					? 'failed'
					: v1Decision.allowed
						? 'allowed'
						: 'denied',
			v1Reason: v1Decision.reason,
			comparison,
			enforcementSource,
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
