import 'server-only'

import type {
	AuthorizationActor,
	AuthorizationDecision,
} from '@/platform/authorization'
import { normalizeRoles } from '@/platform/authorization'

import type { LabOSActionBoundaryProjection } from './action-boundaries'
import type { LabOSAuthorizationBoundaryId } from './boundary-ids'
import type { LabOSPermission } from './permissions'
import {
	LABOS_ORGANIZATION_ROLES,
	type LabOSOrganizationRole,
} from './roles'
import {
	labosAuthorizationService,
	type LabOSAuthorizationService,
} from './service'
import { structuredLabOSShadowMonitor } from './shadow-telemetry'

export const LABOS_SHADOW_COMPARISONS = Object.freeze([
	'MATCH_ALLOW',
	'MATCH_DENY',
	'LEGACY_ALLOW_V1_DENY',
	'LEGACY_DENY_V1_ALLOW',
] as const)

export type LabOSShadowComparison =
	(typeof LABOS_SHADOW_COMPARISONS)[number]

export const LABOS_SHADOW_ERROR_CODES = {
	LEGACY_EVALUATION_FAILED: 'AUTHZ_SHADOW_LEGACY_EVALUATION_FAILED',
	V1_EVALUATION_FAILED: 'AUTHZ_SHADOW_V1_EVALUATION_FAILED',
} as const

export type LabOSShadowErrorCode =
	(typeof LABOS_SHADOW_ERROR_CODES)[keyof typeof LABOS_SHADOW_ERROR_CODES]

/** Sanitized fail-closed error for an unavailable enforcing legacy gate. */
export class LabOSShadowLegacyEvaluationError extends Error {
	readonly code = LABOS_SHADOW_ERROR_CODES.LEGACY_EVALUATION_FAILED

	constructor() {
		super('Authorization evaluation failed')
		this.name = 'LabOSShadowLegacyEvaluationError'
	}
}

export type LabOSShadowComparisonMonitorEvent = Readonly<{
	event: 'labos.authorization.shadow_comparison'
	boundaryId: LabOSAuthorizationBoundaryId
	actionName: string
	permission: LabOSPermission
	organizationId: string
	actorRoles: readonly LabOSOrganizationRole[]
	unknownRoleCount: number
	legacyRequiredRole: 'OWNER' | 'MANAGER' | 'ADMIN' | 'STAFF' | null
	correlationId: string
	legacyOutcome: 'allowed' | 'denied' | 'failed'
	v1Outcome: 'allowed' | 'denied' | 'failed'
	v1Reason: AuthorizationDecision['reason'] | typeof LABOS_SHADOW_ERROR_CODES.V1_EVALUATION_FAILED
	comparison?: LabOSShadowComparison
	enforcementSource: 'legacy'
	severity: 'info' | 'warning' | 'high'
	reviewPriority: 'routine' | 'review' | 'highest'
	durationMs: number
}>

export type LabOSShadowConfigurationFailureEvent = Readonly<{
	event: 'labos.authorization.shadow_configuration_failure'
	boundaryId: string
	actionName?: string
	permission?: LabOSPermission
	organizationId?: string
	correlationId: string
	failureReason:
		| LabOSShadowErrorCode
		| 'AUTHZ_BOUNDARY_NOT_REGISTERED'
		| 'AUTHZ_BOUNDARY_VALIDATED_INPUT_INVALID'
		| 'AUTHZ_BOUNDARY_PROJECTOR_FAILED'
	enforcementSource: 'legacy'
	severity: 'high'
	reviewPriority: 'review'
}>

export type LabOSShadowMonitorEvent =
	| LabOSShadowComparisonMonitorEvent
	| LabOSShadowConfigurationFailureEvent

export interface LabOSShadowMonitor {
	record(event: LabOSShadowMonitorEvent): void
}

/**
 * Default allowlisted telemetry. It intentionally excludes target IDs,
 * emails, operation intent, user input, and caught exception details.
 */
export const consoleLabOSShadowMonitor: LabOSShadowMonitor = {
	record(event) {
		const writer =
			event.severity === 'high'
				? console.error
				: event.event === 'labos.authorization.shadow_comparison' &&
					  event.comparison?.includes('LEGACY_')
					? console.warn
					: console.info
		writer(event)
	},
}

/** Records sanitized server-wiring failures without changing enforcement. */
export function recordLabOSShadowConfigurationFailure(
	event: Omit<
		LabOSShadowConfigurationFailureEvent,
		'event' | 'enforcementSource' | 'severity' | 'reviewPriority'
	>,
	monitor: LabOSShadowMonitor = structuredLabOSShadowMonitor,
): void {
	try {
		monitor.record({
			event: 'labos.authorization.shadow_configuration_failure',
			...event,
			enforcementSource: 'legacy',
			severity: 'high',
			reviewPriority: 'review',
		})
	} catch {
		// Observability must never alter the legacy enforcement decision.
	}
}

export type ShadowV1Decision =
	| Readonly<{
			status: 'completed'
			allowed: boolean
			reason: AuthorizationDecision['reason']
	  }>
	| Readonly<{
			status: 'failed'
			allowed: false
			reason: typeof LABOS_SHADOW_ERROR_CODES.V1_EVALUATION_FAILED
	  }>

export type LabOSShadowEvaluationResult = Readonly<{
	boundaryId: LabOSAuthorizationBoundaryId
	correlationId: string
	comparison: LabOSShadowComparison
	legacyDecision: Readonly<{ allowed: boolean }>
	v1Decision: ShadowV1Decision
	/** The only decision that shadow middleware may enforce. */
	enforcement: Readonly<{ source: 'legacy'; allowed: boolean }>
}>

export type LabOSShadowEvaluationInput = Readonly<{
	actor: AuthorizationActor
	projection: LabOSActionBoundaryProjection
	/** Existing role gate, evaluated unchanged and kept authoritative. */
	evaluateLegacy: () => boolean | Promise<boolean>
}>

export type LabOSShadowEvaluationOptions = Readonly<{
	authorizationService?: LabOSAuthorizationService
	monitor?: LabOSShadowMonitor
	now?: () => number
	/** Injectable only for deterministic tests; runtime uses crypto.randomUUID. */
	generateCorrelationId?: () => string
}>

export function classifyLabOSShadowComparison(
	legacyAllowed: boolean,
	v1Allowed: boolean,
): LabOSShadowComparison {
	if (legacyAllowed) {
		return v1Allowed ? 'MATCH_ALLOW' : 'LEGACY_ALLOW_V1_DENY'
	}
	return v1Allowed ? 'LEGACY_DENY_V1_ALLOW' : 'MATCH_DENY'
}

function evaluateV1(
	service: LabOSAuthorizationService,
	actor: AuthorizationActor,
	projection: LabOSActionBoundaryProjection,
	correlationId?: string,
) {
	if (projection.boundaryId === 'A-123') {
		return service.can({
			actor,
			permission: projection.permission,
			correlationId,
		})
	}

	if (projection.boundaryId === 'A-124') {
		return service.can({
			actor,
			permission: projection.permission,
			target: projection.target,
			operation: projection.operation,
			correlationId,
		})
	}

	return service.can({
		actor,
		permission: projection.permission,
		target: projection.target,
		correlationId,
	})
}

/**
 * Runs the unchanged legacy role gate and Authorization V1 for a validated,
 * trusted action-boundary projection. Both evaluations start before either
 * result is interpreted, so legacy denial does not suppress shadow evidence.
 *
 * V1 denial or infrastructure failure is observational only. The returned
 * enforcement decision always equals the legacy result. If the legacy gate
 * itself fails, the request fails closed because no enforcing decision exists.
 */
export async function evaluateLabOSAuthorizationShadow(
	input: LabOSShadowEvaluationInput,
	options: LabOSShadowEvaluationOptions = {},
): Promise<LabOSShadowEvaluationResult> {
	const service = options.authorizationService ?? labosAuthorizationService
	const monitor = options.monitor ?? structuredLabOSShadowMonitor
	const now = options.now ?? (() => performance.now())
	const correlationId = (
		options.generateCorrelationId ?? (() => crypto.randomUUID())
	)()
	const startedAt = now()
	const normalizedRoles = normalizeRoles(
		input.actor.memberRoles,
		LABOS_ORGANIZATION_ROLES,
	)

	const [legacyResult, v1Result] = await Promise.allSettled([
		Promise.resolve().then(input.evaluateLegacy),
		Promise.resolve().then(() =>
			evaluateV1(
				service,
				input.actor,
				input.projection,
				correlationId,
			),
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
				boundaryId: input.projection.boundaryId,
				actionName: input.projection.actionName,
				permission: input.projection.permission,
				organizationId: input.actor.organizationId,
				actorRoles: normalizedRoles.roles,
				unknownRoleCount: normalizedRoles.unknownRoleCount,
				legacyRequiredRole: input.projection.legacyRequiredRole,
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
			// Monitoring never turns a fail-closed legacy error into another error.
		}
		throw new LabOSShadowLegacyEvaluationError()
	}

	const legacyAllowed = legacyResult.value === true
	const comparison = classifyLabOSShadowComparison(
		legacyAllowed,
		v1Decision.allowed,
	)
	const result = Object.freeze({
		boundaryId: input.projection.boundaryId,
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
			boundaryId: input.projection.boundaryId,
			actionName: input.projection.actionName,
			permission: input.projection.permission,
			organizationId: input.actor.organizationId,
			actorRoles: normalizedRoles.roles,
			unknownRoleCount: normalizedRoles.unknownRoleCount,
			legacyRequiredRole: input.projection.legacyRequiredRole,
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
		// Observability must never alter the legacy enforcement decision.
	}

	return result
}
