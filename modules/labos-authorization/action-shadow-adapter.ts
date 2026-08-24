import 'server-only'

import type { AuthorizationActor } from '@/platform/authorization'
import type { LabRole } from '@/schema/base/enums.base'

import {
	getLabOSActionBoundaryMetadata,
	LABOS_ACTION_BOUNDARY_ERROR_CODES,
	LabOSActionBoundaryError,
	projectLabOSActionBoundary,
	type LabOSActionBoundaryId,
} from './action-boundaries'
import {
	evaluateLabOSAuthorizationShadow,
	recordLabOSShadowConfigurationFailure,
	type LabOSShadowEvaluationResult,
	type LabOSShadowMonitor,
} from './shadow-evaluation'
import type { LabOSAuthorizationService } from './service'

const LEGACY_ROLE_LEVEL: Readonly<Record<LabRole, number>> = Object.freeze({
	OWNER: 4,
	MANAGER: 3,
	ADMIN: 2,
	STAFF: 1,
})

/** Exact compatibility decision currently enforced by requireRoleMiddleware. */
export function evaluateLegacyLabRole(
	actorRole: LabRole,
	requiredRole: LabRole,
): boolean {
	return LEGACY_ROLE_LEVEL[actorRole] >= LEGACY_ROLE_LEVEL[requiredRole]
}

export type LabOSActionShadowAdapterResult =
	| Readonly<{
			status: 'evaluated'
			legacyAllowed: boolean
			shadow: LabOSShadowEvaluationResult
	  }>
	| Readonly<{
			status: 'v1_configuration_failed'
			legacyAllowed: boolean
	  }>

/**
 * Adapts validated action input to the trusted boundary registry. Projection
 * failures are high-severity V1 observations; the unchanged legacy role gate
 * still decides whether the handler may run.
 */
export async function authorizeLabOSActionInShadow(input: {
	boundaryId: LabOSActionBoundaryId
	parsedInput: unknown
	actor: AuthorizationActor
	legacyActorRole: LabRole
	correlationId: string
	authorizationService?: LabOSAuthorizationService
	monitor?: LabOSShadowMonitor
}): Promise<LabOSActionShadowAdapterResult> {
	const metadata = getLabOSActionBoundaryMetadata(input.boundaryId)
	const legacyAllowed = evaluateLegacyLabRole(
		input.legacyActorRole,
		metadata.legacyRequiredRole,
	)

	let projection
	try {
		projection = projectLabOSActionBoundary(
			input.boundaryId,
			input.parsedInput,
		)
	} catch (error) {
		recordLabOSShadowConfigurationFailure(
			{
				boundaryId: input.boundaryId,
				actionName: metadata.actionName,
				permission: metadata.permission,
				organizationId: input.actor.organizationId,
				correlationId: input.correlationId,
				failureReason:
					error instanceof LabOSActionBoundaryError
						? error.code
						: LABOS_ACTION_BOUNDARY_ERROR_CODES.PROJECTOR_FAILED,
			},
			input.monitor,
		)
		return Object.freeze({
			status: 'v1_configuration_failed',
			legacyAllowed,
		})
	}

	const shadow = await evaluateLabOSAuthorizationShadow(
		{
			actor: input.actor,
			projection,
			evaluateLegacy: () => legacyAllowed,
		},
		{
			authorizationService: input.authorizationService,
			monitor: input.monitor,
			generateCorrelationId: () => input.correlationId,
		},
	)

	return Object.freeze({ status: 'evaluated', legacyAllowed, shadow })
}
