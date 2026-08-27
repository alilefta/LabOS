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
 * Executes a handler only when the unchanged legacy decision allows it. This
 * tiny boundary is shared by safe-action middleware and unit tests so shadow
 * results can never accidentally become the enforcing decision.
 */
export async function executeLegacyAuthorizedShadowHandler<Result>(input: {
	authorization: LabOSActionShadowAdapterResult
	handler: () => Promise<Result> | Result
	onDenied: () => never
}): Promise<Result> {
	if (!input.authorization.legacyAllowed) input.onDenied()
	return input.handler()
}

/**
 * Executes a cutover action using the deployment-selected enforcement result.
 * Shadow/rollback modes preserve the legacy gate; V1 mode denies projection
 * or evaluation failures and never falls back to legacy authorization.
 */
export async function executeLabOSAuthorizedHandler<Result>(input: {
	authorization: LabOSActionShadowAdapterResult
	enforcementSource: 'legacy' | 'v1'
	handler: () => Promise<Result> | Result
	onDenied: () => never
}): Promise<Result> {
	if (input.authorization.status === 'v1_configuration_failed') {
		if (input.enforcementSource === 'v1' || !input.authorization.legacyAllowed) {
			input.onDenied()
		}
		return input.handler()
	}
	if (!input.authorization.shadow.enforcement.allowed) input.onDenied()
	return input.handler()
}

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
	enforcementSource?: 'legacy' | 'v1'
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
			input.enforcementSource,
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
			enforcementSource: input.enforcementSource,
		},
	)

	return Object.freeze({ status: 'evaluated', legacyAllowed, shadow })
}
